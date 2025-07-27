import { NotFoundError } from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import { generateGatewayToken } from "./middlewares/gateway-token";
import { log } from "./logger";
import { IncomingMessage, ServerResponse } from "http";
import { setCookie } from "./middlewares/set-cookie";

interface createProxyParams {
  target: string;
  serviceName: string;
  serviceNameForLogging: string;
  handleSelfResponse?: boolean;
  selfResponseCallback?: (
    responseBuffer: Buffer,
    proxyRes: IncomingMessage,
    req: Request,
    res: ServerResponse
  ) => Promise<string | Buffer>;
}

function responseLogger(
  req: Request,
  statusCode: number,
  serviceNameForLogging: string
) {
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const message = `Proxy Service Response: ${serviceNameForLogging}, Url : ${url}, Method: ${req.method}, StatusCode : ${statusCode}`;
  if (statusCode! >= 400) log.error(message, "proxy.ts/responseLogger()");
  else log.info(message, "proxy.ts/responseLogger()");
}

export const createProxy = ({
  target,
  serviceName,
  handleSelfResponse,
  serviceNameForLogging,
  selfResponseCallback,
}: createProxyParams) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    selfHandleResponse: handleSelfResponse,

    pathRewrite: (_path: string, req: Request) => {
      const url = new URL(
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      const pattern = new RegExp(`^/api/(v[0-9]+)/${serviceName}(\\/.*)?$`);
      const match = url.pathname.match(pattern);
      if (!match)
        throw new NotFoundError("Url Not Found", "Proxy Request Function");

      let rewrittenPath = `/api/${match[1]}${match[2] || ""}`;
      const queryString = url.search; // includes ? and the params

      return rewrittenPath + queryString;
    },
    on: {
      proxyReq: (proxyReq, req: Request) => {
        const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        const gatewayToken = generateGatewayToken();
        proxyReq.setHeader("x-gateway-token", gatewayToken);

        const accessToken = req.signedCookies?.accessToken;
        if (accessToken && req.currentUser) {
          proxyReq.setHeader("Authorization", `Bearer ${accessToken}`);
          proxyReq.setHeader("x-user", JSON.stringify(req.currentUser));
        }

        const refreshToken = req.signedCookies?.refreshToken;
        if (refreshToken) {
          proxyReq.setHeader("x-refresh-token", refreshToken);
        }

        log.info(
          `Proxy Service Request: ${serviceNameForLogging}, Url : ${url}, Method : ${req.method}`,
          "proxy.ts/createProxy.proxyReq()"
        );
      },

      proxyRes:
        handleSelfResponse && selfResponseCallback
          ? responseInterceptor(selfResponseCallback!)
          : (proxyRes, req, _res) => {
              responseLogger(
                req,
                proxyRes.statusCode || 500,
                serviceNameForLogging
              );
            },
    },
  });
};

export const authProxy = createProxy({
  target: "http://localhost:4001",
  serviceName: "auth",
  serviceNameForLogging: "Authentication",
  handleSelfResponse: true,
  selfResponseCallback: async (
    responseBuffer: Buffer<ArrayBufferLike>,
    proxyRes: IncomingMessage,
    req: Request,
    res: ServerResponse
  ) => {
    responseLogger(req, proxyRes.statusCode || 500, "Authentication");
    try {
      const body = responseBuffer.toString("utf-8");
      const data = JSON.parse(body);

      if (data.accessToken) {
        setCookie({
          res: res as Response,
          name: "accessToken",
          data: data.accessToken,
          maxAge: 15 * 60 * 1000,
        });
        delete data.accessToken;
      }

      if (data.refreshToken) {
        setCookie({
          res: res as Response,
          name: "refreshToken",
          data: data.refreshToken,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        delete data.refreshToken;
      }

      return JSON.stringify(data); // return modified body
    } catch (error) {
      log.error(
        `Failed to parse proxy response for Authentication`,
        "proxy.ts/authProxy.selfResponseCallback()",
        error as Error
      );
      return JSON.stringify({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
});
