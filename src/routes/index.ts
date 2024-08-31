import expesss from 'express';

const router = expesss.Router();

import authRouter from './auth.routes';
import userRouter from './user.routes';
import productsRouter from './product.routes';
import { successResponse } from '../utils/response';

router.get('/ping', (_req, res) => {
  successResponse(res, 200, 'pong');
});

router.use('/api/users', userRouter);
router.use('/api/auth', authRouter);
router.use('/api/products', productsRouter);

export default router;
