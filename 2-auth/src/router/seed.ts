import {
  seedPermissions,
  seedRolePermissions,
  seedRoles,
  seedUsers,
} from "@auth/controller/seed/seed";
import { Router } from "express";

const router: Router = Router();

router.post("/api/v1/seed/users/:count", seedUsers);
router.post("/api/v1/seed/roles", seedRoles);
router.post("/api/v1/seed/permissions", seedPermissions);
router.post("/api/v1/seed/role-permissions", seedRolePermissions);

export { router as seedRouter };
