// 1) crear app.js
// 2) npm init --yes
// 3) crear una carpeta llamada src
// 4) npm i express
// 5) Agregar el "type": "module", en el package.json
// 6) node --watch src/app.js

//``

import express from "express";
import productsRouter from "../routes/products.router.js";
import cartsRouter from "../routes/carts.router.js";

const PORT = 8080;
const app = express();

//Middlewares---------------------------
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//--------------------------------------


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/api/home", (req, res) => {
    const bienvenidaHTML = `
    <html>
        <head>
          <title>Bienvenida</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: black;
            }
          </style>
        </head>
        <body>
          <h1>¡Primera Preentrega Coderhouse José Pablo Becker!</h1>
        </body>
      </html>
    `;
    res.send(bienvenidaHTML)
});

//Middleware 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Recurso no encontrado" })
});

app.listen(PORT, () => {
  console.log("Servidor 1a Pre Entrega", PORT)});