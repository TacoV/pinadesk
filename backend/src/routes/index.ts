import { Router } from 'express'
import presenceRouter from '../modules/presence'
import ordersRouter from '../modules/orders'

const router = Router()

router.use('/presence', presenceRouter)
router.use('/orders', ordersRouter)

export default router