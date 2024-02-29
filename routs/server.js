import {Router} from 'express'
import {getAll} from '../controlers/servers.js'
const router = Router()

router.get('/api/server', getAll)

export default router