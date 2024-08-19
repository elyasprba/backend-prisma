import expesss from 'express';
import { getUserController } from '../controller/users-controller';
import { checkToken } from '../middleware/access-token';

const router = expesss.Router();

router.get('/', checkToken, getUserController);

export default router;
