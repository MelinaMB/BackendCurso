import express from "express";
import { productsRouter } from './routes/products.routers.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from "./routes/views.router.js";
import { cartViewRouter } from './routes/cartView.router.js';
import { messagesRouter } from "./routes/messages.router.js";
import { __dirname, connectMongo, connectSocket, connectSocketChat } from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from 'connect-mongo';
import { iniPassport } from "./config/passport.config.js";
import passport from "passport";
import { sessionsRouter } from "./routes/session.router.js";
import { Command } from "commander";
import config from "./config/config.js";
import { userRouter } from "./routes/users.router.js";
import {userDTO} from './DAO/DTO/user.dto.js'
import { ticketRouter } from "./routes/ticket.router.js";

console.log(config);

// ---------uso libreria commander
// const program = new Command();

// program
//   .option("-d", "Variables para debug", false)
//   .option("-p <port>", "Puerdo del servicor", 8080)
//   .option("--mode <mode>", "Modo de trabajo", "production")
//   .requiredOption(
//     "-u <user>",
//     "User que usa el app",
//     "No se ha declarado un user"
//   )
//   .option("-l, --letters [letters...]", "Especificar letras");

// program.parse();

// console.log("Options: ", program.opts());
// console.log("Valor de mode: ", program.opts().mode);
// console.log("Datos no reconocibles: ", program.args);


// ---------comandos para saber cosas del proceso

// console.log("ID del proceso: ", process.pid);
// console.log("Argumentos del proceso:", process.argv);
// console.log("Variables Enviroment: ", process.env)

// ----------argumentos que le estoy pasando al proceso
// console.log("Argumentos del proceso:", process.argv);
// console.log("Argumentos del proceso:", process.argv.slice(2));
// const puerto = process.argv[2];
// console.log(puerto);


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
app.use("/api/cartView", cartViewRouter);
app.use("/api/ticket", ticketRouter)
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/test-chat", messagesRouter);
app.use('/api/user', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use("/api/session/current", (req, res) => {
  const informacionUser = new userDTO(req.session);
   res.status(200).json({ user: informacionUser});
});
// ---------------------------------------



app.get('/', (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "no esta la ruta!!!",
    data: {},
  });
});


