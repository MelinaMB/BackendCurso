const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        const productsString = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(productsString);
        this.products = products;
    }

    addProduct(product) {
        const existe = this.products.find((producto) => producto.code === product.code);
        if (!existe) {
            if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
                let maxId = 0;
                this.products.forEach((producto) => {
                    if (producto.id > maxId) {
                        maxId = producto.id;
                    }
                });
                maxId++;
                const id = maxId;
                const newProduct = { ...product, id: id }
                this.products.push(newProduct);
                const productsString = JSON.stringify(this.products);
                fs.writeFileSync(this.path, productsString);
            } else {
                console.log('Fields missing in the product with code: ' + product.code);
            }
        } else {
            console.log('The product with code: ' + product.code + ' already exists');
        }
    };

    getProducts() {
        return this.products;
    };

    getProductById(product) {
        const encontrar = this.products.find((producto) => producto.id === product);
        if (encontrar) {
            console.log(encontrar)
            console.log(`product with that id found`) 
        } else {
            console.log("not found id") 
        };
    };

    updateProduct(idproduct, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
        const indesProductEncontrado = this.products.find((producto) => producto.id == idproduct);
        const productUpdate = {
            ...indesProductEncontrado,
            title: newTitle, 
            description: newDescription, 
            price: newPrice, 
            thumbnail: newThumbnail, 
            code: newCode, 
            stock: newStock
        };
        if (indesProductEncontrado) {
           
            const update = Object.assign(indesProductEncontrado , productUpdate);
            
        } else {
            console.log("product id not found")
        }
        const productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString);

    };

    deleteProduct(product) {
        const deleteProdindex = this.products.findIndex((producto) => producto.id == product);
        console.log("Index to delete: " + deleteProdindex)
        const eliminado = this.products.splice(deleteProdindex, 1);
        console.log('eliminado:', eliminado);
       
        const productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString);
    };
}

const supermercado = new ProductManager("productos.json");
supermercado.addProduct({
    title: "jabon",
    description: "jabon de uso corporal con fragacia a lavanda",
    price: 100,
    thumbnail: "https://www.google.com.ar/search?q=jabon+lavanda&tbm=isch&ved=2ahUKEwi3pei84Lj-AhU4r5UCHYwlCcYQ2-cCegQIABAA&oq=jabon+lavanda&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEAUQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB46BAgjECc6BwgAEIoFEEM6CggAEIoFELEDEEM6CAgAEIAEELEDUMYCWPkZYJEgaABwAHgAgAFCiAGoBJIBATmYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=YVdBZPfwOLje1sQPjMuksAw&bih=937&biw=1920&hl=es-419#imgrc=wVqyxfGazoNNhM",
    code: "abc12",
    stock: 9
}
);
supermercado.addProduct({
    title: "leche",
    description: "leche de vaca larga vida",
    price: 100,
    thumbnail: "https://www.google.com.ar/search?q=leche&tbm=isch&ved=2ahUKEwisoIfE4Lj-AhVYkZUCHSmpDPwQ2-cCegQIABAA&oq=leche&gs_lcp=CgNpbWcQAzIECCMQJzIHCAAQigUQQzIHCAAQigUQQzIHCAAQigUQQzIKCAAQigUQsQMQQzIHCAAQigUQQzIICAAQgAQQsQMyBQgAEIAEMggIABCABBCxAzIICAAQgAQQsQM6BggAEAcQHjoGCAAQCBAeOgsIABCABBCxAxCDAVDiC1inEmDnFWgAcAB4AIAB0gKIAdsFkgEHNC4xLjAuMZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=cVdBZOyjB9ii1sQPqdKy4A8&bih=937&biw=1920&hl=es-419#imgrc=vbeNZboI89V4DM",
    code: "abc1234",
    stock: 5,
}

);
supermercado.addProduct({
    title: "azucar",
    description: "azucar proveniente de caña de azucar de misines",
    price: 100,
    thumbnail: "https://www.google.com.ar/search?q=azucar&tbm=isch&ved=2ahUKEwj0p8a357j-AhWHNbkGHb-sBugQ2-cCegQIABAA&oq&gs_lcp=CgNpbWcQARgDMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnOgQIIxAnOgcIABCKBRBDOgoIABCKBRCxAxBDOggIABCABBCxAzoFCAAQgARQuwtYuwtgmzloAXAAeACAAT2IAT2SAQExmAEAoAEBqgELZ3dzLXdpei1pbWewAQrAAQE&sclient=img&ei=rV5BZLSdOYfr5OUPv9mawA4&bih=937&biw=1920&hl=es-419#imgrc=yhGLIGyWmaK1BM",
    code: "abc12345",
    stock: 20,
}
);
supermercado.addProduct({
    title: "pan",
    description: "elaborado con harina de trigo",
    price: 130,
    thumbnail: "https://www.google.com.ar/search?q=azucar&tbm=isch&ved=2ahUKEwj0p8a357j-AhWHNbkGHb-sBugQ2-cCegQIABAA&oq&gs_lcp=CgNpbWcQARgDMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnOgQIIxAnOgcIABCKBRBDOgoIABCKBRCxAxBDOggIABCABBCxAzoFCAAQgARQuwtYuwtgmzloAXAAeACAAT2IAT2SAQExmAEAoAEBqgELZ3dzLXdpei1pbWewAQrAAQE&sclient=img&ei=rV5BZLSdOYfr5OUPv9mawA4&bih=937&biw=1920&hl=es-419#imgrc=yhGLIGyWmaK1BM",
    code: "abc123456",
    stock: 13,
}
);


console.log(supermercado.getProducts());
supermercado.getProductById(3); 
supermercado.updateProduct( 4, "arroz", "arroz fino largo", 100, "https://www.google.com.ar/search?q=arroz+largo+fino&tbm=isch&ved=2ahUKEwiep-6DmLv-AhVar5UCHfJUBjgQ2-cCegQIABAA&oq=arroz+largo+fino&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIGCAAQCBAeOgQIIxAnOgcIABCKBRBDOgoIABCKBRCxAxBDOggIABCABBCxA1DuB1jFJGD9KGgAcAB4AIABXogB-AWSAQIxMpgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=Ep5CZJ7WFdre1sQP8qmZwAM&bih=937&biw=1920&hl=es-419#imgrc=0Mo59X9sf2ToNM", "abc12347", 40 );
supermercado.deleteProduct(4);