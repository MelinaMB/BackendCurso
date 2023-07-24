import { CartService } from '../services/carts.service.js'

const Service = new CartService();

class CartViewController {
    async getCartById(req, res){
        const cid = req.query.cid
        const carts = await Service.getCartById(cid);
        const cartById = carts
        let cart = cartById.map((doc) => {
        return {
            product: doc.product,
            quantity: doc.quantity
        }
    })
    return res.render("carts", cart )
    }
}

export const cartViewController = new CartViewController();