import expesss from 'express';
import {
  loginUser,
  refreshTokenUser,
  regiterUser,
} from '../controller/auth.controller';
import { userRegistrationSchema, validateData } from '../middleware/validation';
import { checkDuplicate } from '../utils/check.duplicate.user';

const router = expesss.Router();

router.post(
  '/register',
  validateData(userRegistrationSchema),
  checkDuplicate,
  regiterUser
);
router.post('/login', loginUser);
router.post('/refresh-token', refreshTokenUser);

export default router;
