export const seedRolesList = ["admin", "buyer", "seller"];

const actions = ["create", "view", "update", "delete"] as const;
const resources = ["gigs", "users", "sellers"] as const;
export const permissionList = resources.flatMap((resource) =>
  actions.map((action) => `${resource}/${action}`)
);

export const rolePermissionList = {
  admin: {
    gigs: ["/create", "/view", "/update", "/delete"],
    users: ["/create", "/view", "/update", "/delete"],
    sellers: ["/create", "/view", "/update", "/delete"],
  },
  buyer: {
    gigs: ["/create", "/view", "/update", "/delete"],
    users: ["/view"],
    sellers: ["/create", "/view"],
  },
  seller: {
    gigs: ["/view"],
    users: ["/view"],
    sellers: ["/view"],
  },
};
