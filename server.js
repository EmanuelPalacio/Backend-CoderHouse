import express, { json, urlencoded } from "express";
import routerProductos from "./routes/productos.route.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
//platilla handlebards
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", routerProductos);
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
app.listen(PORT, (error) => {
  if (error) {
    console.log(`erro al escuchar el puerto ${PORT}, error: ${error}`);
  } else {
    console.log(`escuchando puerto ${PORT}`);
  }
});
