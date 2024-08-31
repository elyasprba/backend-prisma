import expesss from 'express';

// import { checkToken } from '../middleware/access-token';
import { getAllProductsController } from '../controller/products.controller';

const router = expesss.Router();

router.get('/', getAllProductsController);

export default router;
