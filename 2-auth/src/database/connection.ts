import { config } from "@auth/config";
import { log } from "@auth/logger";
import { Options, Sequelize } from "sequelize";

type SequelizeConfig = Record<string, Options>;
export const sequelizeConfig: SequelizeConfig = {
  development: {
    dialect: "mysql",
    host: config.MYSQL_HOST,
    port: Number(config.MYSQL_PORT),
    username: config.MYSQL_USER,
    logging: false,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    dialectOptions: {
      multipleStatements: true,
    },
  },
};

export const sequelize = new Sequelize({
  ...sequelizeConfig.development,
});

export async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();
    log.info(
      "MySQL DatabaseConnection has been established successfully.",
      "connection.ts/checkDatabaseConnection()"
    );
  } catch (error) {
    log.error(
      "Unable to connect to the database:",
      "connection.ts/checkDatabaseConnection()",
      error as Error
    );
    process.exit(1);
  }
}
