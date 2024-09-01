import expesss from 'express';
import {
  createProductsController,
  getAllProductsController,
} from '../controller/products.controller';

import { checkToken } from '../middleware/access-token';
import { createProductsSchema, validateData } from '../middleware/validation';
import upload from '../middleware/upload';

const router = expesss.Router();

router.get('/', checkToken, getAllProductsController);
router.post(
  '/',
  checkToken,
  upload,
  validateData(createProductsSchema),
  createProductsController
);

export default router;
