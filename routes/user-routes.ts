import expesss from 'express';
import {
  getAllUserController,
  updateUserController,
} from '../controller/users-controller';
import { checkToken } from '../middleware/access-token';
import { updateUserSchema, validateData } from '../middleware/validation';
import upload from '../middleware/upload';

const router = expesss.Router();

router.get('/', checkToken, getAllUserController);
router.patch(
  '/',
  checkToken,
  upload,
  validateData(updateUserSchema),
  updateUserController
);

export default router;
