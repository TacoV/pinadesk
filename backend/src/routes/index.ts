import { Router } from 'express'
import presenceRouter from '../modules/presence'
import ordersRouter from '../modules/orders'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use('/presence', presenceRouter)
router.use('/orders', ordersRouter)

router.get('/auth/user', authenticateToken, (req, res) => {
  // @ts-expect-error - user is added by middleware
  res.json({ user: req.user })
})

export default router