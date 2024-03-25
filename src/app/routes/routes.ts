import express from "express";
import { userRoutes } from "../modules/User/user.route";
import { AdminRoutes } from "../modules/Admin/admin.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    routes: userRoutes,
  },
  {
    path: "/admin",
    routes: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
