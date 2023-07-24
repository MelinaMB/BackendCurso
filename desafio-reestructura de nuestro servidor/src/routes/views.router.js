import express from "express";
import { CartService } from "../services/carts.service.js";
import { viewsController } from "../controllers/views.controllers.js";

const cartService = new CartService()

export const viewsRouter = express.Router();

viewsRouter.get('/products', viewsController.getProducts);

viewsRouter.get('/products', viewsController.products);

viewsRouter.get('/realTimeProducts', viewsController.socket);

viewsRouter.get("/carts/:cid", viewsController.getCartById);

viewsRouter.get("/products/:pid", viewsController.getProductById);

viewsRouter.get('/', viewsController.home);

viewsRouter.get('/logingit', viewsController.loginGit);


// -------antes

// viewsRouter.get('/products', async (req, res) => {
//   const limit = parseInt(req.query.limit) || 10;
//   const page = parseInt(req.query.page) || 1;
//   const sort = req.query ? { price: req.query.sort } : '';
//   let query = {};
//   if (req.query.category) {
//     query.category = req.query.category
//   }
//   if (req.query.title) {
//     query.title = req.query.title
//   }
//   if (req.query.description) {
//     query.description = req.query.description
//   }
//   if (req.query.price) {
//     query.price = req.query.price
//   }
//   const allProducts = await ProductModel.paginate(query, { limit, page, sort });
//   const { docs, ...rest } = allProducts;
//   const firstName = req.session.user.firstName;
//   const rol = req.session.user.rol;

//   let products = docs.map((doc) => {
//     return {
//       _id: doc._id.toString(),
//       title: doc.title,
//       description: doc.description,
//       code: doc.code,
//       price: doc.price,
//       status: doc.satus,
//       stock: doc.stock,
//       category: doc.category,
//       thumbnails: doc.thumbnails
//     }
//   })


//   return res.render("products", { products, paginate: rest, firstName, rol });
// });

// viewsRouter.get('/products', async (req, res) => {
//   const user = { email: req.session.email }
//   return res.render("products", { user })
// });

// viewsRouter.get('/realTimeProducts', async (req, res) => {
//   const products = await productManager.getProduct();
//   return res.render("realTimeProducts", { products });
//   socketServer.emit('msg_back_to_front', { products });
// });

// viewsRouter.get("/carts/:cid", async (req, res, next) => {
//   try {
//     const { cid } = req.params;
//     const cart = await cartService.getCartById(cid);

//     const simplifiedCart = cart.products.map((item) => {
//       return {
//         title: item.product.title,
//         price: item.product.price,
//         quantity: item.quantity,
//       };
//     });
//     console.log(simplifiedCart);
//     res.render("carts", { cart: simplifiedCart });
//   } catch (error) {
//     next(error);
//   }
// });

// viewsRouter.get("/products/:pid", async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const product = await ProductModel.findById(pid);
//     const productSimplificado = {
//       _id: product._id.toString(),
//       title: product.title,
//       description: product.description,
//       price: product.price,
//       thumbnail: product.thumbnails,
//       code: product.code,
//       stock: product.stock,
//       category: product.category,
//     };

//     console.log(productSimplificado);
//     res.render("product", { product: productSimplificado });
//   } catch (error) {
//     next(error);
//   }
// });

// viewsRouter.get('/', async (req, res) => {
//   res.render('home');
// });

// viewsRouter.get('/login', async (req, res) => {
//   res.render('login-github');
// });