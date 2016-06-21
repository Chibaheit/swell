import { Router } from 'express'
import userRouter from './user'

const router = Router()
const apiRouter = Router()
apiRouter.use(userRouter)

router.use('/api', apiRouter)

export default router
