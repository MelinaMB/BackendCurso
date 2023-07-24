import { ProductService } from "../services/products.service.js";

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
          }
    }

    async getProductById(req, res){
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
          }
    }

    async createOne(req, res){
        try {
            const product = req.body;
            const prodCreated = await Service.createOne(product);
            return res.status(201).json({
              status: 'success',
              msg: 'product created',
              data: prodCreated,
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({
              message: 'error',
              data: {},
            });
          }
    }

    async updateOne(req, res){
        try {
            const id = req.params.pid;
            const upDate = req.body;
            const prodUpdate = await Service.updateOne(id, upDate);
            return res.status(200).json({
              status: 'success',
              msg: 'user uptaded',
              data: prodUpdate,
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
          }
    }

    async delete(req, res){
        try {
            const productId = req.params.pid;
            const proddeleted = await Service.deleteOne(productId);
            return res.status(200).json({
              status: 'success',
              masg: 'producto borrado',
              data: proddeleted,
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
          }
    }
}

export const productsController = new ProductsController();