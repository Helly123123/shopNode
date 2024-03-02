import { express } from "express";
const router = express.Router()
import {product} from '../controlers/product.js'



router.post('/prod', product)

export default router