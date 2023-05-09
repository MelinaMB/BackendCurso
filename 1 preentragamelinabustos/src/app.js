import express from "express";
import { productsRouter } from './routes/products.routers.js';
import { cartsRouter }   from './routes/carts.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get('/', (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "no esta la ruta!!!",
        data: {},
    });
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})