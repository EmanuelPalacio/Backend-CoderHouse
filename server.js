import express, { json, urlencoded } from "express";
import { Server as IOServer } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
//platilla handlebards
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const products = [];
const message = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("form");
});
//configuracion de handlebars
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: join(__dirname, "public/views/layouts/main.hbs"),
    layoutsDir: join(__dirname, "public/views/layouts"),
    partialsDir: join(__dirname, "public/views/partials"),
  })
);
//establecemos el motor de la plantilla
app.set("view engine", "hbs");
// se establece donde se encuetran los archivos
app.set("views", join(__dirname, "public/views"));
app.use(express.static("public"));

const expressServer = app.listen(PORT, (error) => {
  if (error) {
    console.log(`erro al escuchar el puerto ${PORT}, error: ${error}`);
  } else {
    console.log(`escuchando puerto ${PORT}`);
  }
});

const io = new IOServer(expressServer);

io.on("connection", (socket) => {
  // Logeamos el id del socket que se conecto
  console.log(`New connection, socket ID: ${socket.id}`);
  // Cuando se conecta un nuevo cliente le emitimos a ese cliente todos los mensajes que se mandaron hasta el momento
  socket.emit("server:product", products);
  // Nos ponesmo a escuchar el evento "client:product" que recibe la info de un mensaje
  socket.on("product:info", (productInfo) => {
    // Actualizamos nuestro arreglo de mensajes
    products.push(productInfo);
    // Emitimos a TODOS los sockets conectados el arreglo de mensajes actualizado
    io.emit("server:product", products);
  });
  //lo mismo pero para mensajes
  socket.emit("server:message", message);
  // Nos ponesmo a escuchar el evento "client:message" que recibe la info de un mensaje
  socket.on("chat:messageInfo", (messageInfo) => {
    // Actualizamos nuestro arreglo de mensajes
    message.push(messageInfo);
    // Emitimos a TODOS los sockets conectados el arreglo de mensajes actualizado
    io.emit("server:message", message);
  });
});
