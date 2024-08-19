import expesss from 'express';
import { loginUser, regiterUser } from '../controller/auth-controller';
import {
  userLoginSchema,
  userRegistrationSchema,
  validateData,
} from '../middleware/validation';

const router = expesss.Router();

router.get('/register', validateData(userRegistrationSchema), regiterUser);
router.get('/login', validateData(userLoginSchema), loginUser);

export default router;
