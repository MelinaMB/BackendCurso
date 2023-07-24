import express from "express";
import { cartController } from "../controllers/cart.controller.js";

export const cartsRouter = express.Router();

cartsRouter.post("/", cartController.createCart);

cartsRouter.get("/", cartController.getAllCart);

cartsRouter.get("/:cid", cartController.getCartById);

cartsRouter.post("/:cid/product/:pid", cartController.postProdByIdInCart);

cartsRouter.delete("/:cid/product/:pid", cartController.deleteProdByIdInCart);

cartsRouter.delete("/:cid", cartController.deleteProductById);

cartsRouter.put('/:cid', cartController.updateCartById)

cartsRouter.put('/:cid/products/:pid', cartController.updateCartQuantity)

//   ----antes
// cartsRouter.get("/:cid", async (req, res) => {
//     try {
//         const idcart = req.params.cid;
//         const cart = await Service.getCartById(idcart);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(404).json({ message: "cart not found" });
//     }
// });

// cartsRouter.post("/:cid/product/:pid", async (req, res) => {
//     try {
//         const idproduct = req.params.pid;
//         const idcart = req.params.cid;
//         const cart = await Service.postProdInCart(idcart, idproduct);
//         res.status(200).json({
//             status: "success",
//             masg: "producto agregado",
//             data: cart, idcart,
//         });

//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });

// cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
//     try {
//         const idproduct = req.params.pid;
//         const idcart = req.params.cid;
//         const cart = await Service.deleteOneProductById(idcart, idproduct);
//         res.status(200).json({
//             status: "success",
//             masg: "producto eliminado",
//             data: cart, idcart,
//         });

//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });

// cartsRouter.delete("/:cid", async (req, res) => {
//     try {
        
//         const idcart = req.params.cid;
//         const cart = await Service.deleteProducts(idcart);
//         res.status(200).json({
//             status: "success",
//             msg: "producto eliminado",
//             data: cart, idcart,
//         });

//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });

// cartsRouter.put('/:cid', (async (req, res) => {
//     try {
//         const idCart = req.params.cid;
//         const newCartContent = req.body;
//       const cartUpdate = await Service.updateCart(idCart, newCartContent);
//       res.status(200).json({
//         success: true,
//         msg: "cart update",
//         data: cartUpdate, idCart
//       });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
//   }))

//   cartsRouter.put('/:cid/products/:pid', (async (req, res) => {
//     try {
//         const idCart = req.params.cid;
//         const idProd = req.params.pid;
//         const prodContent = req.body;
//       const cartUpdate = await Service.updateCartProdQuantity(idCart, idProd, prodContent.quantity);
//       res.status(200).json({
//         success: true,
//         msg: "cart update",
//         data: cartUpdate, idCart
//       });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
//   }))