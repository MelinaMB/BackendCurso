import { CartService } from '../services/carts.service.js'

const Service = new CartService();

class CartController{

    async createCart(req, res){
        try {
            const cart = await Service.createCart();
            res.status(201).json(cart);
        } catch (error) {
            res.status(400).json({ message: "cart not created" });
        }
    }

    async getAllCart(req, res){
        try {
            const carts = await Service.getAllCart();
            res.status(200).json(carts);
        } catch (error) {
            res.status(404).json({ message: "cart not found" });
        }
    }

    async getCartById(req, res){
        try {
            const idcart = req.params.cid;
            const cart = await Service.getCartById(idcart);
            res.status(200).json(cart);
        } catch (error) {
            res.status(404).json({ message: "cart not found" });
        }
    }

    async postProdByIdInCart(req, res){
        try {
            const idproduct = req.params.pid;
            const idcart = req.params.cid;
            const cart = await Service.postProdInCart(idcart, idproduct);
            res.status(200).json({
                status: "success",
                masg: "producto agregado",
                data: cart, idcart,
            });
    
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteProdByIdInCart(req, res){
        try {
            const idproduct = req.params.pid;
            const idcart = req.params.cid;
            const cart = await Service.deleteOneProductById(idcart, idproduct);
            res.status(200).json({
                status: "success",
                masg: "producto eliminado",
                data: cart, idcart,
            });
    
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteProductById(req, res){
        try {
            const idcart = req.params.cid;
            const cart = await Service.deleteProducts(idcart);
            res.status(200).json({
                status: "success",
                msg: "producto eliminado",
                data: cart, idcart,
            });
    
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async updateCartById(req, res){
        try {
            const idCart = req.params.cid;
            const newCartContent = req.body;
          const cartUpdate = await Service.updateCart(idCart, newCartContent);
          res.status(200).json({
            success: true,
            msg: "cart update",
            data: cartUpdate, idCart
          });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async updateCartQuantity(req, res){
        try {
            const idCart = req.params.cid;
            const idProd = req.params.pid;
            const prodContent = req.body;
          const cartUpdate = await Service.updateCartProdQuantity(idCart, idProd, prodContent.quantity);
          res.status(200).json({
            success: true,
            msg: "cart update",
            data: cartUpdate, idCart
          });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

}

export const cartController = new CartController();