import express from 'express'
import {selectAllFromdb} from '../controlers/selectAllfromdb.js'
const router = express.Router()





router.get('/database', selectAllFromdb)
  

export default router