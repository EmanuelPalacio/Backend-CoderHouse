import express, { json, urlencoded } from "express";
import routerProductos from "./routes/productos.route.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/api/productos", routerProductos);

app.listen(PORT, (error) => {
  if (error) {
    console.log(`erro al escuchar el puerto ${PORT}, error: ${error}`);
  } else {
    console.log(`escuchando puerto ${PORT}`);
  }
});
