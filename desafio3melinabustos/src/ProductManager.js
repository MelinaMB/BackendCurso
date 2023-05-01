import fs from 'fs';

class ProductManager {
    constructor() {
        this.path = './src/productos.json';
    }
    // funcion para obteber los datos, leer la informacion
    async getProduct() {
        try {
            // primero comprobar si los archivos existen
            if (fs.existsSync(this.path)) {
                // aca es solo un string por eso tengo que usar el json para que se pase a archivo formato json
                const data = await fs.promises.readFile(this.path, 'utf-8');
                // hay que parsearlo para que java púeda leerlo lo paso a json
                return JSON.parse(data);
            }
            // si no existe el archivo, te lo crea y devuelve lo que esta guardado
            await fs.promises.writeFile(this.path, JSON.stringify([]))
            return [];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // los metodos tienen que ser asincronicos
    async addProduct(product) {
        try {
            // traigo la data que lei anteriomente, data actualizada
            let data = await this.getProduct();
            console.log(data);
            const existe = data.find((producto) => producto.code === product.code);
            if (!existe) {
                if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
                    let maxId = 0;
                    data.forEach((producto) => {
                        if (producto.id > maxId) {
                            maxId = producto.id;
                        }
                    });
                    maxId++;
                    const id = maxId;
                    const newProduct = { ...product, id: id }
                    data.push(newProduct);
                    const productsString = JSON.stringify(data);
                    await fs.promises.writeFile(this.path, productsString);
                    return newProduct;
                } else {
                    console.log('Fields missing in the product with code: ' + product.code);
                }
            } else {
                console.log('The product with code: ' + product.code + ' already exists');
            }
        } catch (error) {
            throw new Error("not found product");
        };
    };


    async getProductById(product) {
        // data actualizada
        try {
            let data = await this.getProduct();
            const encontrar = data.find((producto) => producto.id === product);
            if (!encontrar) {
                throw new Error('product not found');
            }
            return encontrar;
        } catch (error) {
            throw new Error("not found id")
        }
    };

    async updateProduct(idproduct, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
        try {
            let data = await this.getProduct();
            const indesProductEncontrado = data.find((producto) => producto.id == idproduct);
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
    
                const update = Object.assign(indesProductEncontrado, productUpdate);
    
            } else {
                console.log("product id not found")
            }
            const productsString = JSON.stringify(data);
            await fs.promises.writeFile(this.path, productsString);
            
        } catch (error) {
            throw new Error("could not update")
        }

    };

    async deleteProduct(product) {
        try {
            let data = await this.getProduct();
            const deleteProdindex = data.findIndex((producto) => producto.id == product);
            console.log("Index to delete: " + deleteProdindex)
            const eliminado = data.splice(deleteProdindex, 1);
            console.log('eliminado:', eliminado);
    
            const productsString = JSON.stringify(data);
           await fs.promises.writeFile(this.path, productsString);  
        } catch (error) {
            throw new Error ('product not delete');
        }
    };
}

const producto1 = {
    title: "jabon",
    description: "jabon de uso corporal con fragacia a lavanda",
    price: 100,
    thumbnail: "https://www.google.com.ar/search?q=jabon+lavanda&tbm=isch&ved=2ahUKEwi3pei84Lj-AhU4r5UCHYwlCcYQ2-cCegQIABAA&oq=jabon+lavanda&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEAUQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB46BAgjECc6BwgAEIoFEEM6CggAEIoFELEDEEM6CAgAEIAEELEDUMYCWPkZYJEgaABwAHgAgAFCiAGoBJIBATmYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=YVdBZPfwOLje1sQPjMuksAw&bih=937&biw=1920&hl=es-419#imgrc=wVqyxfGazoNNhM",
    code: "abc12",
    stock: 9
}
const producto2 = {
    title: "leche",
    description: "leche de vaca larga vida",
    price: 100,
    thumbnail: "https://www.google.com.ar/search?q=leche&tbm=isch&ved=2ahUKEwisoIfE4Lj-AhVYkZUCHSmpDPwQ2-cCegQIABAA&oq=leche&gs_lcp=CgNpbWcQAzIECCMQJzIHCAAQigUQQzIHCAAQigUQQzIHCAAQigUQQzIKCAAQigUQsQMQQzIHCAAQigUQQzIICAAQgAQQsQMyBQgAEIAEMggIABCABBCxAzIICAAQgAQQsQM6BggAEAcQHjoGCAAQCBAeOgsIABCABBCxAxCDAVDiC1inEmDnFWgAcAB4AIAB0gKIAdsFkgEHNC4xLjAuMZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=cVdBZOyjB9ii1sQPqdKy4A8&bih=937&biw=1920&hl=es-419#imgrc=vbeNZboI89V4DM",
    code: "abc1234",
    stock: 5,
}

const producto3 = {
    title: "azucar",
    description: "azucar proveniente de caña de azucar de misines",
    price: 100,
    thumbnail: "https://www.google.com.ar/search?q=azucar&tbm=isch&ved=2ahUKEwj0p8a357j-AhWHNbkGHb-sBugQ2-cCegQIABAA&oq&gs_lcp=CgNpbWcQARgDMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnOgQIIxAnOgcIABCKBRBDOgoIABCKBRCxAxBDOggIABCABBCxAzoFCAAQgARQuwtYuwtgmzloAXAAeACAAT2IAT2SAQExmAEAoAEBqgELZ3dzLXdpei1pbWewAQrAAQE&sclient=img&ei=rV5BZLSdOYfr5OUPv9mawA4&bih=937&biw=1920&hl=es-419#imgrc=yhGLIGyWmaK1BM",
    code: "abc12345",
    stock: 20,
}

const producto4 = {
    title: "pan",
    description: "elaborado con harina de trigo",
    price: 130,
    thumbnail: "https://www.google.com.ar/search?q=azucar&tbm=isch&ved=2ahUKEwj0p8a357j-AhWHNbkGHb-sBugQ2-cCegQIABAA&oq&gs_lcp=CgNpbWcQARgDMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnOgQIIxAnOgcIABCKBRBDOgoIABCKBRCxAxBDOggIABCABBCxAzoFCAAQgARQuwtYuwtgmzloAXAAeACAAT2IAT2SAQExmAEAoAEBqgELZ3dzLXdpei1pbWewAQrAAQE&sclient=img&ei=rV5BZLSdOYfr5OUPv9mawA4&bih=937&biw=1920&hl=es-419#imgrc=yhGLIGyWmaK1BM",
    code: "abc123456",
    stock: 13,
}

const productManager = new ProductManager("productos.json");
// tengo que ponerlo en un ambiente asincrono para poder ejecutar la funcion addProduct
const asyncFn = async () => {
    // console.log(await productManager.addProduct(producto1));
    // console.log(await productManager.deleteProduct(7));
    // console.log(await productManager.updateProduct( 4, "arroz", "arroz fino largo", 100, "https://www.google.com.ar/search?q=arroz+largo+fino&tbm=isch&ved=2ahUKEwiep-6DmLv-AhVar5UCHfJUBjgQ2-cCegQIABAA&oq=arroz+largo+fino&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIGCAAQCBAeOgQIIxAnOgcIABCKBRBDOgoIABCKBRCxAxBDOggIABCABBCxA1DuB1jFJGD9KGgAcAB4AIABXogB-AWSAQIxMpgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=Ep5CZJ7WFdre1sQP8qmZwAM&bih=937&biw=1920&hl=es-419#imgrc=0Mo59X9sf2ToNM", "abc12347", 40 ));
    // console.log(await productManager.getProductById(9));
};
asyncFn();

export default ProductManager;