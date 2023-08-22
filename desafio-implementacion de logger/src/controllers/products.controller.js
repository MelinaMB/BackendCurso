import { ProductService } from '../services/products.service.js';
import { generateProduct } from '../utils.js';
import CustomError from '../errors/custom-error.js';
import EErros from '../errors/enums.js';

const Service = new ProductService();

class ProductsController {
  
  async getAll(req, res) {
    try {
      const products = await Service.getAll();

      return res.status(200).json({
        status: 'success',
        msg: 'listado de productos',
        data: products,
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
        data: {},
      });
      req.logger.warn({
        message: error.message,
      });
    }
  }

  async getProductLimit(req, res) {
    try {
      const prodlimit = req.query.limit || 10;
      const page = req.query.page || 1;
      const sort = req.query.sort ? { price: req.query.sort } : '';
      const filtro = req.query.filtro || '';
      const prod = await Service.getProductLimit(prodlimit, page, sort, filtro);
      return res.status(200).json({
        status: 'success',
        msg: 'listado de productos',
        data: prod,
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
        data: {},
      });
      req.logger.warn({
        message: error.message,
      });
    }
  }

  async getProductById(req, res) {
    try {
      const id = req.params.pid;
      const prodById = await Service.getProductById(id);
      return res.status(200).json({
        status: 'success',
        msg: 'producto por id obtenido',
        data: prodById,
      });
    } catch (error) {
      res.status(400).json({
        message: 'error',
        data: {},
      });
      req.logger.warn({
        message: error.message,
      });
    }
  }

  async createOne(req, res, next) {
    try {
      const product = req.body;

      if (!product.title ||  !product.description ||  !product.price ||  !product.code ||  !product.stock ||  !product.status || !product.category) {
        CustomError.createError({
          name: 'Product not created',
          cause: 'Error trying to created a product because of field missing',
          message: 'product was not created',
          code: EErros.PRODUCT_ERROR,
        });
      } else {
        const prodCreated = await Service.createOne(product);
        return res.status(201).json({
          status: 'success',
          msg: 'product created',
          data: prodCreated,
        });
      }
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
      next(error);
    
    }
  }

  async updateOne(req, res, next) {
    try {
      const id = req.params.pid;
      const upDate = req.body;
      if (!upDate.title ||  !upDate.description ||  !upDate.price ||  !upDate.code ||  !upDate.stock ||  !upDate.status || !upDate.category || !id){
        CustomError.createError({
          name: 'Product not updated',
          cause: 'Error trying to update a product because of field missing',
          message: 'product was not update',
          code: EErros.PRODUCT_ERROR,
        });
      }
      const prodUpdate = await Service.updateOne(id, upDate);
      return res.status(200).json({
        status: 'success',
        msg: 'user uptaded',
        data: prodUpdate,
      });
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const productId = req.params.pid;
      const prod = await Service.getProductById(productId);
      if (!prod) {
        CustomError.createError({
          name: 'ProductId not found',
          cause: 'Error trying to delete product because product was not found',
          message: 'product was not found',
          code: EErros.PRODUCT_ERROR,
        });
      } else {
        const proddeleted = await Service.deleteOne(productId);
        return res.status(200).json({
          status: 'success',
          masg: 'producto borrado',
          data: proddeleted,
        });
      }
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
      next(error);
    }
  }

  async mocking(req, res) {
    const products = [];

    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
    return res.status(200).json({
      status: 'success',
      data: products,
    });
  }
}

export const productsController = new ProductsController();
