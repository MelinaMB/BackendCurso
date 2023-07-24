import { CartsModel } from '../DAO/models/carts.model.js';

export class CartModels {
  async createCart(cartParaGuardar) {
    return CartsModel.create(cartParaGuardar);
  }

  async getAllCart() {
    let carts = await CartsModel.find({});
    console.log(JSON.stringify(carts, null, 4));
    return carts;
  }

  async getCartById(_id) {
    let cart = await CartsModel.findOne({ _id: _id });
    console.log(JSON.stringify(cart, null, 4));
    return cart;
  }

  async updateCart(cartId, cartActualizado) {
    return await CartsModel.findOneAndUpdate({ _id: cartId }, cartActualizado);
  }
}

export const cartModels = new CartModels();
