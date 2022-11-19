/* >> Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.
 */
import { Router } from "express";
const routerProductos = Router();
const products = [
  {
    title: "nombre del producto",
    price: "precio",
    thumbnail: "url al logo o foto del producto",
    id: 1,
  },
];

//obtener array de productgos
routerProductos.get("/", (req, res) => {
  res.json(products);
});

//agregar un nuevo producto
routerProductos.post("/", (req, res) => {
  const { tittle, price, thumbnail } = req.body;
  const obj = {
    tittle,
    price,
    thumbnail,
    id: products.length + 1,
  };
  products.push(obj);
  res.status(201).json(obj);
  console.log(obj);
});

//consultar por un producto especifico del array
routerProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  const verify = products.some((e) => e.id == Number(id));
  let result;
  let status;
  verify
    ? ((result = products.find((e) => e.id == Number(id))), (status = 200))
    : ((result = { error: "producto no encontrado" }), (status = 404));
  res.status(status).json(result);
});

// actualizar un producto del array
routerProductos.put("/:id", (req, res) => {
  const { id } = req.params;
  const { tittle, price, thumbnail } = req.body;
  const verify = products.some((e) => e.id === Number(id));
  let result;
  let status;
  if (verify) {
    result = products.find((e) => e.id == Number(id));
    const index = products.indexOf(result);
    result = {
      tittle,
      price,
      thumbnail,
      id: Number(id),
    };
    products.splice(index, 1, result);
    status = 200;
  } else {
    result = { error: "producto no encontrado" };
    status = 404;
  }
  res.status(status).json(result);
});

//eliminar un producto del array
routerProductos.delete("/:id", (req, res) => {
  const { id } = req.params;
  const verify = products.some((e) => e.id === Number(id));
  let result;
  let status;
  if (verify) {
    result = products.find((e) => e.id == Number(id));
    const index = products.indexOf(result);
    products.splice(index, 1);
    result = products;
    status = 200;
  } else {
    result = { error: "producto no encontrado" };
    status = 404;
  }
  res.status(status).json(result);
});

export default routerProductos;
/* Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.
 */
