import expesss from 'express';

const router = expesss.Router();

import authRouter from './auth.routes';
import userRouter from './user.routes';
import productsRouter from './product.routes';

router.get('/ping', (_req, res) => {
  res
    .json({
      message: 'pong',
    })
    .status(200);
});

router.use('/api/users', userRouter);
router.use('/api/auth', authRouter);
router.use('/api/products', productsRouter);

export default router;
