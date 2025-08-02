import { Router } from "express";
import {
  registerservice_provider,
  getsellers,
  getsellerinfo,
} from "../controllers/service_provider.controller.js";
import { loginseller } from "../controllers/service_provider.controller.js";

const router_server = Router();

router_server.route("/sellersignup").post(registerservice_provider);
router_server.route("/getsellerscards").get(getsellers);
router_server.route("/login").post(loginseller);
router_server.route("/getsellerinfo/:id").get(getsellerinfo);

export default router_server;
