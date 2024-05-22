import express from 'express'
import {deleteDiscount} from '../controlers/deleteDiscount.js'
const router = express.Router()

router.post('/delete-discount', deleteDiscount)
  

export default router