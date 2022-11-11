const Contenedor = require('./Contenedor.js')
const express = require('express')
const app = express()
const PORT = 8080
const contenedor = new Contenedor('./productos.txt')
const log = (p) => console.log(p)
//para evitar errores al desplegar el puerto mejor colocar la escucha al final


app.get('/', async (req, res)=>{
    res.send('<h1>Recorda redireccionar a las rutas /productos o /productosRandom</h1>')
})
app.get('/productos', async (req, res)=>{
    res.send(await contenedor.getAll())
})
app.get('/productosRandom', async (req, res)=>{
    res.send(await contenedor.getRandom())
});

//para evitar errores al desplegar el puerto mejor colocar la escucha al final
const server = app.listen(PORT, ()=>{
    console.log(`escuchando ${server.address().port}`)
})
