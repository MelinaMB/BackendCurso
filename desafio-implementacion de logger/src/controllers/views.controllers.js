import { ViewsService } from '../services/view.service.js';
import { ProductModel } from "../DAO/models/products.model.js";
const Service = new ViewsService();

class ViewsControllers {
  async getProducts(req, res) {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query ? { price: req.query.sort } : '';
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.title) {
      query.title = req.query.title;
    }
    if (req.query.description) {
      query.description = req.query.description;
    }
    if (req.query.price) {
      query.price = req.query.price;
    }
    const allProducts = await ProductModel.paginate(query, { limit, page, sort });
    const { docs, ...rest } = allProducts;
    const firstName = req.session.user.firstName;
    const rol = req.session.user.rol;

    let products = docs.map((doc) => {
      return {
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        code: doc.code,
        price: doc.price,
        status: doc.satus,
        stock: doc.stock,
        category: doc.category,
        thumbnails: doc.thumbnails,
      };
    });

    return res.render('products', { products, paginate: rest, firstName, rol });
  }

  async products(req, res){
    const user = { email: req.session.email }
  return res.render("products", { user })
  }

  async socket(req, res){
    const products = Service.socket();
  return res.render("realTimeProducts", { products });
  socketServer.emit('msg_back_to_front', { products });
  }

  async getCartById(req, res, next){
    try {
        const { cid } = req.params;
        const cart = await Service.getCartById(cid);
        res.render("carts", { cart: simplifiedCart });
      } catch (error) {
        req.logger.error({
          message: error.message,
        });
        next(error);
      }
  }

  async getProductById(req, res, next){
    try {
        const { pid } = req.params;
        const productSimplificado = await Service.getProductById(pid);
        res.render("product", { product: productSimplificado });
      } catch (error) {
        req.logger.error({
          message: error.message,
        });
        next(error);

      }
  }

  async home(req, res){
    res.render('login');
  }

  async loginGit(req, res){
    res.render('login-github');
  }
}

export const viewsController = new ViewsControllers();
