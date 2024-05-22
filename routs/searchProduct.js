import express from 'express'
import {searchProduct} from '../controlers/seachCatalog.js'
const router = express.Router()

router.post('/search-productad', searchProduct)

export default router