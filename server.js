import express, { json, urlencoded } from "express";
import { Server as IOServer } from "socket.io";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";
//platilla handlebards
import { engine } from "express-handlebars";
import Contenedor from "./api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

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

const productApi = new Contenedor(
  {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "mibase",
    },
    pool: { min: 0, max: 7 },
  },
  "product"
);

const messageApi = new Contenedor(
  {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "./database/coderhouse.sqlite"),
    },
    useNullAsDefault: true,
  },
  "message"
);

const expressServer = app.listen(PORT, (error) => {
  if (error) {
    console.log(`erro al escuchar el puerto ${PORT}, error: ${error}`);
  } else {
    console.log(`escuchando puerto ${PORT}`);
  }
});

const io = new IOServer(expressServer);

io.on("connection", async (socket) => {
  console.log(`New connection, socket ID: ${socket.id}`);

  socket.emit("server:product", await productApi.getAll());

  socket.on("product:info", async (productInfo) => {
    await productApi.save({
      title: productInfo.title,
      price: Number(productInfo.price),
      thumbnail: productInfo.thumbnail,
    });

    io.emit("server:product", await productApi.getAll());
  });

  socket.emit("server:message", await messageApi.getAll());

  socket.on("chat:messageInfo", async (messageInfo) => {
    await messageApi.save({
      ...messageInfo,
      time: Date().toLocaleString("es-AR"),
    });
    io.emit("server:message", await messageApi.getAll());
  });
});
