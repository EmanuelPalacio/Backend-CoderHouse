import express, { json, urlencoded } from "express";
import routerProductos from "./routes/productos.route.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
//platilla handlebards

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", routerProductos);
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("form");
});
//establecemos el motor de la plantilla
app.set("view engine", "pug");
// se establece donde se encuetran los archivos
app.set("views", join(__dirname, "public/views"));
app.listen(PORT, (error) => {
  if (error) {
    console.log(`erro al escuchar el puerto ${PORT}, error: ${error}`);
  } else {
    console.log(`escuchando puerto ${PORT}`);
  }
});
