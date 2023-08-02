
import { CartService } from '../services/carts.service.js'
import { ProductService } from '../services/products.service.js';
import UserService from '../services/users.service.js';

const Service = new CartService();
const userService = new UserService;
const productService = new ProductService();

export class TicketController {
    async getTicket(req, res){
        const {user: uid} = req.body;
        const {cart: cid} = req.body;
        const products = req.body; 
        const getUser = await userService.getUserById(uid);
        const getCart = await Service.getCartById(cid);

        res.send({status:'success', })
        
    }
    
}