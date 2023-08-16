import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/auth.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);

productsRouter.get('/', productsController.getProductLimit);

productsRouter.get('/:pid', productsController.getProductById);

productsRouter.post('/', productsController.createOne);
// falta al createOne poner isAdmin

productsRouter.put('/:pid', productsController.updateOne);
// falta al updateOne poner isAdmin

productsRouter.delete('/:pid', productsController.delete);
// falta al delete poner isAdmin

productsRouter.get('/products/mockingproducts', productsController.mocking);