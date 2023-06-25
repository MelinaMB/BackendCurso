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
import { authRouter } from './routes/auth.router.js'


const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', handlebars.engine());
app.set("view engine", 'handlebars');
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://melinambustos:jq7wYzhXfWRZtGpe@backend-coder.rpukb6t.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 1000000 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);

// app.get('/show-session', (req, res) => {
//   return res.send(JSON.stringify(req.session));
// });

// app.get('/panel', (req, res) => {
//   console.log(req.session);
//   return res.send('panel');
// });

// app.get('/login', (req, res) => {
//   const { username, password } = req.query;
//   if (username !== 'pepe' || password !== 'pepepass') {
//     return res.send('login failed');
//   }
//   req.session.user = username;
//   req.session.admin = true;
//   res.send('login success!');
// });

// app.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.json({ status: 'logout error', body: err});
//     }
//     res.send('logout ok!');
//   });
// });


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/test-chat", messagesRouter);
app.use('/api/users', usersRouter);
app.use('/auth', authRouter);


connectMongo();
connectSocket(httpServer);
connectSocketChat(httpServer);

app.get('/', (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "no esta la ruta!!!",
        data: {},
    });
});


