import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/auth.js';
import { uploader } from '../utils.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);

productsRouter.get('/', productsController.getProductLimit);

productsRouter.get('/:pid', productsController.getProductById);

productsRouter.post('/',  uploader.single('thumbnails'), productsController.createOne);
// isAdmin,
productsRouter.put('/:pid', isAdmin, productsController.updateOne);

productsRouter.delete('/:pid', isAdmin, productsController.delete);

productsRouter.get('/products/mockingproducts', productsController.mocking);