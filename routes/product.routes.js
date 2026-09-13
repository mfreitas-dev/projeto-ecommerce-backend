import { Router } from 'express';
import { getAllProducts, getProductsByID } from '../controllers/productController.js';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductsByID);

export default productRouter