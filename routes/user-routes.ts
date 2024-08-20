import expesss from 'express';
import { getAllUserController } from '../controller/users-controller';
import { checkToken } from '../middleware/access-token';

const router = expesss.Router();

router.get('/', checkToken, getAllUserController);

export default router;
