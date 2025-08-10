import { log } from "@auth/logger";
import { redisClient } from "@auth/server";
import { getRolePermissions } from "@auth/services/permission.service";

async function cacheRolePermissions() {
  const context = "cacheRolePermissions.ts/cacheRolePermissions()";
  try {
    const rolePermissions = await getRolePermissions();
    await redisClient.set("role-permissions", JSON.stringify(rolePermissions));
    log.info("Role Permission cached successfully", context);
  } catch (error) {
    log.error("Failed to cache role permissions", context, error as Error);
  }
}

export { cacheRolePermissions };
