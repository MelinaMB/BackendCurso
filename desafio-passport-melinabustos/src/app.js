import express from "express";
import { productsRouter } from './routes/products.routers.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from "./routes/views.router.js";
import { messagesRouter } from "./routes/messages.router.js";
import { __dirname, connectMongo, connectSocket, connectSocketChat } from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from 'connect-mongo';
import { usersRouter } from './routes/users.router.js';
import { authRouter} from './routes/auth.router.js'
import { iniPassport } from "./config/passport.config.js";
import passport from "passport";
import { sessionsRouter } from "./routes/session.router.js";

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})

connectMongo();
connectSocket(httpServer);
connectSocketChat(httpServer);

// express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', handlebars.engine());
app.set("view engine", 'handlebars');
app.set("views", path.join(__dirname, "views"));
// --------------------------------------------------

// session se guarda en mongo
app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://melinambustos:jq7wYzhXfWRZtGpe@backend-coder.rpukb6t.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 1000000 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);
// ---------------------------------

// todo lo de passport
iniPassport();
app.use(passport.initialize());
app.use(passport.session());
// -----------------------------

// rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/test-chat", messagesRouter);
app.use('/api/users', usersRouter);
app.use('/auth', authRouter);
app.use('/api/sessions', sessionsRouter);
// ---------------------------------------



app.get('/', (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "no esta la ruta!!!",
        data: {},
    });
});


