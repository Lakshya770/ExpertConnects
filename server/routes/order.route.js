import { Router } from "express";
import { userorders } from "../controllers/orders.controllers.js";
import { sellerorders } from "../controllers/orders.controllers.js";
import { getclients } from "../controllers/orders.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router_order = Router();

router_order.route("/getuserorders/:id").get(verifyJWT, userorders);
router_order.route("/getsellerorders/:id").get(verifyJWT, sellerorders);
router_order.route("/myclients/:id").get(verifyJWT, getclients);

export default router_order;
