import { productsModels } from '../DAO/classes/products.dao.js';

export class ProductService {
  isValidProduct(product) {
    if (
      typeof product.title === 'undefined' ||
      typeof product.description === 'undefined' ||
      typeof product.price === 'undefined' ||
      typeof product.code === 'undefined' ||
      typeof product.stock === 'undefined' ||
      typeof product.status === 'undefined' ||
      typeof product.category === 'undefined'
    ) {
      throw new Error('Product invalid');
    }
  }

  async getAll() {
    const products = await productsModels.getAll();
    return products;
  }

  async getProductLimit(prodlimit, page, sort, filtro) {
    const productLimit = await productsModels.getProductLimit(prodlimit, page, sort, filtro);
    return productLimit;
  }

  async getProductById(_id) {
    const prod = await productsModels.getProductById(_id);
    return prod;
  }

  async createOne(product) {
    this.isValidProduct(product);
    const prodCreated = await productsModels.createOne(product);
    return prodCreated;
  }

  async updateOne(_id, product) {
    if (!_id) throw new Error('invalid_id');
    this.isValidProduct(product);
    const prodUpdate = await productsModels.updateOne(_id, product);
    return prodUpdate;
  }

  async deleteOne(_id) {
    const deleted = await productsModels.deleteOne(_id);
    return deleted;
  }
}

export const productService = new ProductService();
