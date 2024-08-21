import expesss from 'express';
import {
  getAllUserController,
  updateUserController,
} from '../controller/users-controller';
import { checkToken } from '../middleware/access-token';
import { updateUserSchema, validateData } from '../middleware/validation';

const router = expesss.Router();

router.get('/', checkToken, getAllUserController);
router.patch(
  '/',
  checkToken,
  validateData(updateUserSchema),
  updateUserController
);

export default router;
