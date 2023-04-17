class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        console.log(this.products);
        return this.products;
    };

    addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    ) {
        const existe = this.products.find((producto) => producto.code === code);
        if (existe) {
            throw 'el code existe'
        }   if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw 'fields missing';
        }

        let maxId = 0;
        this.products.forEach((producto) => {
            if (producto.id > maxId) {
                maxId = producto.id;
            }
        });
        maxId++;

        const id = maxId;
        const productossubidos = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id,
        };
        
       
        this.products.push(productossubidos);

    };

    getProductById(prodid) {
        const encontrar = this.products.find((producto) => producto.id === prodid);
        if (encontrar) {
            throw `Se encontro un producto con ese id`
        } else {
            throw "not faund id"
        }
    };
}

const supermercado = new ProductManager();
supermercado.addProduct(
    "jabon",
    "jabon de uso corporal con fragacia a lavanda",
    100,
    "http",
    "abc123",
    10

);
supermercado.addProduct(
    "leche",
    "leche de vaca larga vida",
    100,
    "http",
    "abc1234",
    10
    
);
supermercado.addProduct(
    "azucar",
    "azucar proveniente de caña de azucar de misines",
    100,
    "http",
    "abc12345",
    10
);
supermercado.addProduct(
    "azucar",
    "azucar proveniente de caña de azucar de misines",
    100,
    "http",
    "abc123456",
    10
);

supermercado.getProducts();
supermercado.getProductById(1);



