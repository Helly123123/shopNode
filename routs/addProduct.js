import express from 'express'
import {addProduct} from '../controlers/addProduct.js'
const router = express.Router()

router.post('/test-page', addProduct)
  

export default router