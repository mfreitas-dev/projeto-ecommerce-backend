import { Router } from 'express';
import { CreateProduct, deleteProduct, getAllProducts, getProductsByID, updateProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { login } from '../controllers/authController.js';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductsByID);
productRouter.post('/', authMiddleware, CreateProduct);
productRouter.put('/:id', authMiddleware, updateProduct);
productRouter.delete('/:id', authMiddleware, deleteProduct);

export default productRouter