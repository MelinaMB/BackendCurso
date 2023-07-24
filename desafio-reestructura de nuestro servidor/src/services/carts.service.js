import { productsModels } from  '../models/products.models.js';
import { cartModels } from '../models/cart.models.js';

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
}

// ------antes
// async postProdInCart(cartId, productId) {
//   let cart = await Models.findOne({ _id: cartId });
//   if (cart) {
//     let product = await productsModels.getProdById(productId);
//     if (product) {
//       const prodCart = cart.products.find((prod) => prod.product.id == productId);
//       if (prodCart) {
//         prodCart.quantity++;
//       } else {
//         cart.products.push({ product: productId, quantity: 1 });
//       }
//     }
//   }

//   let res = await Models.updateOne({ _id: cartId }, cart);
//   return res;
// }

// async getCartById(_id) {
//   let cart = await Models.findOne({ _id: _id });
//   console.log(JSON.stringify(cart, null, 4));
//   return cart;
// }

// async deleteOneProductById(cid, pid) {
//   let cart = await Models.getCartById(cid);
//   const productIndex = cart.products.findIndex((prod) => prod.product.id === pid);
//   if (productIndex === -1) throw new Error('product not found');
//   cart.products.splice(productIndex, 1);
//   cart.save();
//   return cart;
// }

// async deleteProducts(cartId) {
//   const cart = await Models.findOneAndUpdate({ _id: cartId }, {products: []});
//   return cart;
// }

// async updateCart(cartId, prodList) {
//     const catrUpdate = await Models.findOneAndUpdate({ _id: cartId }, {products: prodList});
//     return catrUpdate;

// }

// async updateCartProdQuantity(cartId, productId, quantity) {
//   let cart = await Models.findOne({ _id: cartId });
//   if (cart) {
//     let product = await productsModels.getProdById(productId);
//     if (product) {
//       const prodCart = cart.products.find((prod) => prod.product.id == productId);
//       if (prodCart) {
//         prodCart.quantity = quantity;
//         let res = await Models.updateOne({ _id: cartId }, cart);
//       }
//     }
//   }

//   return cart;
// }
