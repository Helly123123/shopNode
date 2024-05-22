import express from 'express'
import {createDiscount} from '../controlers/createDiscount.js'
const router = express.Router()

router.post('/create-discount', createDiscount)
  

export default router