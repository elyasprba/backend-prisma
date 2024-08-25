import expesss from 'express';

const router = expesss.Router();

import userRouter from './user-routes';
import authRouter from './auth.routes';
import { successResponse } from '../middleware/response';

router.get('/ping', (_req, res) => {
  successResponse(res, 200, 'pong');
});

router.use('/api/users', userRouter);
router.use('/api/auth', authRouter);

export default router;
