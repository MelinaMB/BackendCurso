import CustomError from '../errors/custom-error.js';
import EErros from '../errors/enums.js';
import { CartService } from '../services/carts.service.js'

const Service = new CartService();

class CartController {

    async createCart(req, res) {
        try {
            const cart = await Service.createCart();
            res.status(201).json(cart);
        } catch (error) {
            res.status(400).json({ message: "cart not created" });
            req.logger.error({
                message: error.message,
            });
        }
    }

    async getAllCart(req, res) {
        try {
            const carts = await Service.getAllCart();
            res.status(200).json(carts);
        } catch (error) {
            res.status(404).json({ message: "cart not found" });
            req.logger.info({
                message: error.message,
              });
        }
    }

    async getUserCart(req, res) {
        try {
            const cartId = req.session.user.cart;
            res.status(200).json({ cart: cartId });
        } catch (error) {
            res.status(404).json({ message: "cart not found" });
            req.logger.info({
                message: error.message,
              });
        }
    }

    async getCartById(req, res) {
        try {
            const idcart = req.params.cid;
            const cart = await Service.getCartById(idcart);
            res.status(200).json(cart);
        } catch (error) {
            res.status(404).json({ message: "cart not found" });
            req.logger.info({
                message: error.message,
            });
        }
    }

    async postProdByIdInCart(req, res, next) {
        try {
            const idproduct = req.params.pid;
            const idcart = req.params.cid;
            const cart = await Service.postProdInCart(idcart, idproduct);
            if (!cart) {
                CustomError.createError({
                    name: 'Product was not added in cart',
                    cause: 'Error trying to add product in cart because idcart not found or idproduct not found',
                    message: 'product not add in cart',
                    code: EErros.PRODUCT_IN_CART_ERROR,
                });
            } else {
                res.status(200).json({
                    status: "success",
                    masg: "producto agregado",
                    data: cart, idcart,
                });
            }
        } catch (error) {
            req.logger.warn({
                message: error.message,
              });
            next(error);
            
        }
    }

    async deleteProdByIdInCart(req, res) {
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
            req.logger.warn({
                message: error.message,
              });
        }
    }

    async deleteProductById(req, res) {
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
            req.logger.warn({
                message: error.message,
              });
        }
    }

    async updateCartById(req, res) {
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
            req.logger.warn({
                message: error.message,
              });
        }
    }

    async updateCartQuantity(req, res) {
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
            req.logger.warn({
                message: error.message,
              });
        }
    }

    async createPurchase(req, res) {
        try {
            const cartId = req.params.cid;
            const userId = req.session.user._id;
            const ticket = await Service.generatePurchase(cartId, userId);
            if (ticket) {
                res.status(200).json({ ticketId: ticket._id });
            } else {
                res.status(404).json({ message: "error" });
            }
        } catch (error) {
            res.status(404).json({ message: error.message });
            req.logger.error({
                message: error.message,
              });
        }
    }

}

export const cartController = new CartController();