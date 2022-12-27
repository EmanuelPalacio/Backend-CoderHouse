// use ecommerce <= Usamos la base de datos "ecommerce" si no existe mongo la crea
db.products.insert([
  {
    title: "NOTEBOOK ASUS TUF GAMING A15 FA506IHR-HN051",
    price: 4990,
    thumbnail:
      "https://imagenes.newcomputers.ar/webp.php?src=/FOTOS/90NR07G7_-1000x10…",
    stock: 10,
  },
  {
    title: "PAD HYPERX FURY ULTRA RGB LED",
    price: 290,
    thumbnail:
      "https://imagenes.newcomputers.ar/webp.php?src=/fotos/PADHXRGB.JPG&alto=210&ancho=264",
    stock: 5,
  },
  {
    title: "TECLADO HYPERX ALLOY ORIGINS 60 HYPERX SWITCH",
    price: 580,
    thumbnail:
      "https://imagenes.newcomputers.ar/webp.php?src=/fotos/origins60aqua.jpg&alto=210&ancho=264",
    stock: 15,
  },
  {
    title: "NOTEBOOK ASUS TUF GAMING A15 FA506IHR-HN051",
    price: 900,
    thumbnail:
      "https://imagenes.newcomputers.ar/webp.php?src=/FOTOS/90NR07G7_-1000x10…",
    stock: 10,
  },
  {
    title: "MOUSE HYPERX PULSEFIRE SURGE RGB",
    price: 1280,
    thumbnail:
      "https://imagenes.newcomputers.ar/webp.php?src=/fotos/mouse-gamer-hyperx-pulsefire-surge-rgb-new-master-D_NQ_NP_984930-MLA29390295169_022019-F.jpg&alto=210&ancho=264",
    stock: 8,
  },
  {
    title: "MICROFONO HYPERX SOLOCAST WHITE CONDENSADOR PC/PS4",
    price: 1700,
    thumbnail:
      "https://imagenes.newcomputers.ar/foto.php?src=/FOTOS/SOLOCASWHITE.JPG&ancho=750&alto=750",
    stock: 4,
  },
  {
    title: "NOTEBOOK LENOVO V15 PENTIUM",
    price: 2300,
    thumbnail:
      "https://imagenes.newcomputers.ar/webp.php?src=/FOTOS/82C30000AR.JPG&alto=210&ancho=264&Tipo=AP",
    stock: 13,
  },
  {
    title: "TABLET PC SAMSUNG GALAXY TAB 10.4 SM-T500NZAE",
    price: 2860,
    thumbnail:
      "https://imagenes.newcomputers.ar/webp.php?src=/fotos/galaxytaba7.jpg&alto=210&ancho=264&Tipo=GS",
    stock: 9,
  },
  {
    title: "GAMING I3-10MA GTX1660TI",
    price: 3350,
    thumbnail:
      "https://web.newcomputers.com.ar/foto.asp?src=/fotos/compragamer_Imganen_general_15649_Gabinete_SuperPower_Loulan_RGB_CG-9900_8b670fa9-grn.jpg&alto=310&ancho=310",
    stock: 16,
  },
  {
    title: "DDR4 8 GB. 2666 MHz KINGSTON FURY BEAST RGB",
    price: 4320,
    thumbnail:
      "https://imagenes.newcomputers.ar/webp.php?src=/FOTOS/FURYBEASTRGB.JPG&alto=210&ancho=264",
    stock: 10,
  },
]); // Se inserta de forma ordenada los 10 productos

db.message.insert([
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
  {
    user_name: "emanuel@gmail.com",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "",
  },
]); // Se inserta de forma ordenada los 10 messages

db.products.find(); //coleccion de productos
db.products.estimatedDocumentCount();

db.message.find(); //coleccion de message
db.message.estimatedDocumentCount();

db.products.insertOne({
  title: "probando usuario de lectura",
  price: 4990,
  thumbnail:
    "https://imagenes.newcomputers.ar/webp.php?src=/FOTOS/90NR07G7_-1000x10…",
  stock: 7,
}); //inserta un producto a la coleccion de products

//lista de productos ordenados por precios
db.products.find({ price: { $lte: 1000 } });
db.products.find({
  $and: [{ price: { $lt: 3000 } }, { price: { $gt: 1000 } }],
});
db.products.find({
  price: { $gt: 3000 },
});

db.products.find().skip(2).limit(1).sort({ precio: -1 }); //tercer producto mas barato

db.products.update({}, { $inc: { stock: 100 } }, { multi: true }); //incremento el valor de todos en 100
db.products.update(
  { price: { $gt: 4000 } },
  { $set: { stock: 0 } },
  { multi: true }
);
db.products.deleteMany({ price: { $lte: 1000 } });

db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{ role: "read", db: "ecommerce" }],
});
