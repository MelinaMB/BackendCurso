import express from "express";
import { productsRouter } from './routes/products.routers.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";
const productManager = new ProductManager();

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', handlebars.engine());
app.set("view engine", 'handlebars');
app.set("views", path.join(__dirname, "views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/realTimeProducts", viewsRouter);
app.use("/home", viewsRouter);


app.get('/', (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "no esta la ruta!!!",
        data: {},
    });
});

const httpServer = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})

const socketServer = new Server(httpServer);
/*socket del servidor se usa socket.on para escuchar la conexion
de un nuevo socket en este caso escuchar al socket del front */
socketServer.on("connection", (socket) => {

    // recibo el nuevo producto del front
    socket.on('new product', async (newProduct) => {
        await productManager.addProduct(newProduct);
        // envio de nuevo los productos al front
        const productosTotal = await productManager.getProduct();
        
        socket.emit('new product', (productosTotal));
    });

});