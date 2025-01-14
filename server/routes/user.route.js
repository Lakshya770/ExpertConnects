import { Router } from "express";
import registeruser from "../controllers/user.controller.js";
import {loginuser} from "../controllers/user.controller.js";


const routeruser=Router()

routeruser.route('/signup').post(registeruser)
routeruser.route('/login').post(loginuser)




export default routeruser