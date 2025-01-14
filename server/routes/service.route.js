import { Router } from "express";
import {putservices} from "../controllers/services.controller.js"
import {getservices} from "../controllers/services.controller.js"
import {getservicesbyname} from "../controllers/services.controller.js"
import {serviceforsearchbar} from "../controllers/services.controller.js"
import {myservices} from "../controllers/services.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router_services=Router()



router_services.route('/addservice').post(verifyJWT,putservices)
router_services.route('/getsellersservices/:id').get(verifyJWT,getservices)
router_services.route('/getsellersservicescategory/:name').get(getservicesbyname)
router_services.route('/getserviceformain/:searchtext').get(serviceforsearchbar);
router_services.route('/myservices/:id').get(verifyJWT,myservices);


export default router_services