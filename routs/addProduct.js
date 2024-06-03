import express from 'express'
import {addProduct} from '../controlers/addProduct.js'
const router = express.Router()

router.post('/add-product', addProduct)
  

export default router