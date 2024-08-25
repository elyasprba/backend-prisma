import expesss from 'express';
import {
  loginUser,
  refreshTokenUser,
  regiterUser,
} from '../controller/auth-controller';
import { userRegistrationSchema, validateData } from '../middleware/validation';

const router = expesss.Router();

router.post('/register', validateData(userRegistrationSchema), regiterUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshTokenUser);

export default router;
