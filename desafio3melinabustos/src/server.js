import express from 'express';
import ProductManager from "./ProductManager.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;
const path = "./productos.json";

const productManager = new ProductManager(path);

app.get("/api/products/:pid", async (req, res) => {
    try {
        const products = await productManager.getProduct();
        const idproduct = req.params.pid;
        const productoEncontrado = products.find((prod) => prod.id == idproduct)
        if (productoEncontrado) {
            return res.status(200).json(productoEncontrado);
        } else {
            return res.status(200).json({ error: "producto no encontrado con el id" + idproduct });
        }  
    } catch (error) {
        res.status(400).json({message: "error"});
    }
});

app.get("/api/products", async (req, res) => {
    try {
        const prodlimit = req.query.limit;
        const products = await productManager.getProduct();
        const limit = prodlimit
        if (limit) {
            const productoslimitados = products.slice(0, limit)
            return res.status(200).json(productoslimitados);
        } else {
            return res.status(200).json(products);
        } 
    } catch (error) {
        res.status(400).json({message: "error"});
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


