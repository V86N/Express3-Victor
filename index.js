const express = require("express")
const app = express()
const PORT = 3000
const path = require('path')

app.use(express.json())
//app.use(express.static(path.join(__dirname, 'public')))

let productos = [
    { id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
    { id: 2, nombre: 'FIFA 23 PS5', precio: 1000 },
    { id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
    { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
    { id: 5, nombre: 'Skin Valorant', precio: 120 },
    { id: 6, nombre: 'Taza de Star Wars', precio: 220 },
  ]

app.post("/crearProducto",(req,res)=>{
    const nuevoProducto={
        id: productos.length + 1,
        name: req.body.nombre,
        precio: req.body.precio
}
productos.push(nuevoProducto)
res.send(productos)
})

app.put("/actualizarProducto/id/:id",(req,res)=>{
    productos.forEach(producto =>{
        if (producto.id == req.params.id) {
            producto.nombre = req.body.nombre
            producto.precio = req.body.precio
        }
    })
    res.send(productos)
})

app.delete("/borrarProducto/id/:id",(req,res)=>{
    res.send(productos.filter(producto => producto.id != req.params.id))
})

app.get("/precioProducto",(req,res)=>{
    const { min, max } = req.query
    const productosFiltrados = productos.filter(p => p.precio >= min && p.precio <= max)
    res.send(productosFiltrados)
})

app.get("/productos/rangoPrecios", (req,res) => {
    const productosFiltrados = productos.filter(p => p.precio >= 50 && p.precio <= 250)
    res.send(productosFiltrados)
})

app.get("/productos/id/:id", (req,res) => {
    const {id} = req.params
    const producto = productos.find (p => p.id === parseInt(id))
    res.send(producto)
})

app.get("/productos/nombre/:nombre", (req,res) => {
    const {nombre} = req.params
    const producto = productos.find (p => p.nombre.toLowerCase().includes(nombre.toLowerCase()))
    res.send(producto)
})

  app.listen(PORT, () => console.log("Servidor levantado en el puerto " + PORT))