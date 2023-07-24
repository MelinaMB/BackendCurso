import ProductManager from "../DAO/ProductManager.js";
const productManager = new ProductManager();

class viewsModels {
    async socket(){
        const products = await productManager.getProduct();
        return products;
    }
}

export default viewsModels;