import { Router } from 'express'
import { authenticateToken } from '../../middleware/auth'
import { getPresence, setPresence, deletePresence } from './handlers'

const router = Router()

router.get('/:userId', authenticateToken, getPresence)
router.post('/:userId', authenticateToken, setPresence)
router.delete('/:userId', authenticateToken, deletePresence)

export default router