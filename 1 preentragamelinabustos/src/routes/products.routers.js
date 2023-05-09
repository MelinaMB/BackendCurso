import express from "express";
import ProductManager from "../ProductManager.js";

export const productsRouter = express.Router();

const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
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

productsRouter.get("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(200).json({ error: "producto no encontrado con el id" + productId });
        }
    } catch (error) {
        res.status(400).json({ message: "error" });
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        if (productManager.isValidProduct(newProduct)) {
            const existe = await productManager.getProductByCode(newProduct.code);
            if (!existe) {
                let prod = await productManager.addProduct(newProduct);
                return res.status(201).json(prod);
            } else {
                res.status(404).json({ message: 'The product with code: ' + newProduct.code + ' already exists' });
            }
        } else {
            res.status(400).json({ message: 'Fields missing in the product with code: ' + newProduct.code });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "error" });
    };
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        const upDate = req.body;
        if (productManager.isValidProduct(upDate)) {
            const idproduct = req.params.pid;
            await productManager.updateProduct(idproduct, upDate);
            return res.status(201).json({
                status: "success",
                masg: "producto actualizado",
                data: upDate,
            });
        } else {
            console.log('Fields missing in the product with code: ' + newProduct.code);
            res.status(404).json({ message: 'Fields missing in the product with code: ' + newProduct.code });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        await productManager.deleteProduct(productId);
        return res.status(201).json({
            status: "success",
            masg: "producto borrado"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});