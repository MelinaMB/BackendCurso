import { productsModels } from  '../DAO/classes/products.dao.js';
import { cartModels } from '../DAO/classes/cart.dao.js';
import { ProductService } from './products.service.js';
import { TicketService } from './ticket.service.js';

const productService = new ProductService();
const ticketService = new TicketService();

export class CartService {
  async createCart() {
    const created = cartModels.createCart({
      products: [],
      quantity: 1,
    });
    return created;
  }

  async getAllCart() {
    return await cartModels.getAllCart();
  }

  async postProdInCart(cartId, productId) {
    let cart = await this.getCartById(cartId);
    if (cart) {
      let product = await productsModels.getProductById(productId);
      if (product) {
        const prodCart = cart.products.find((prod) => prod.product.id == productId);
        if (prodCart) {
          prodCart.quantity++;
        } else {
          cart.products.push({ product: productId, quantity: 1 });
        }
      }
    }

    return await cartModels.updateCart(cartId, cart);
  }

  async getCartById(_id) {
    return await cartModels.getCartById(_id);
  }

  async deleteOneProductById(cid, pid) {
    let cart = await cartModels.getCartById(cid);
    const productIndex = cart.products.findIndex((prod) => prod.product.id === pid);
    if (productIndex === -1) throw new Error('product not found');
    cart.products.splice(productIndex, 1);
    return await cartModels.updateCart(cid, cart);
  }

  async deleteProducts(cartId) {
    return await cartModels.updateCart(cartId, { products: [] });
  }

  async updateCart(cartId, cart) {
    return await cartModels.updateCart(cartId, cart);
  }

  async updateCartProdQuantity(cartId, productId, quantity) {
    let cart = await this.getCartById(cartId);
    if (cart) {
      let product = await productsModels.getProductById(productId);
      if (product) {
        const prodCart = cart.products.find((prod) => prod.product.id == productId);
        if (prodCart) {
          prodCart.quantity = quantity;
          cart = await cartModels.updateCart(cartId, cart);
        }
      }
    }

    return cart;
  }

  async generatePurchase(cartId, userId) {
    // obtengo el carrito
    let cart = await this.getCartById(cartId);
    
    const prodWithStock = [];
    const prodWithOutStock = [];

    if (cart) {
      // chequear que cada producto del carrito tenga stock y si tiene stock lo resto del stock total del producto.
      // armar una lista de productos sin stock y armo otra lista de producto con stock
      cart.products.forEach((item) => {
        const prod = productService.getProductById(item.id);
        if (prod.stock >= item.quantity) {
          prod.stock - item.quantity

          productService.updateOne(prod.id, prod);

          prodWithStock.push(item);
        } else {
          prodWithOutStock.push(item);

          // Agregas la lista de productos sin stock a la respuesta del servicio
           
        }
      })
      // Chequeo que la cantidad de elementos de la lista con stock sea mayor 0 y genero el ticket.
      // borro los productos que tienen stock y actualizo el carrito dejando solo los productos sin stock 
      if (prodWithStock.length > 0) {

        const ticket = ticketService.createOne(prodWithStock, userId);
        
        prodWithStock.forEach((item) => {

          this.deleteOneProductById(cartId, item.id);
        })

        // Agrego el ticket a la respuesta del servicio
        return ticket;
      }
      
    }
    return cart;
  }

}

export const cartService = new CartService();
