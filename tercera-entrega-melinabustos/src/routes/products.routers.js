import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/auth.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);

productsRouter.get('/', productsController.getProductLimit);

productsRouter.get('/:pid', productsController.getProductById);

productsRouter.post('/', isAdmin, productsController.createOne);

productsRouter.put('/:pid', isAdmin, productsController.updateOne);

productsRouter.delete('/:pid', productsController.delete);
// falta al delete poner isAdmin

productsRouter.get('/products/mockingproducts', productsController.mocking);