import {Router} from "express";
import crypto from "crypto";

const router = Router();

// Función para generar un ID único----------------------------------------------
const generateUniqueProductId = () => {
    let newId;
    do {
      newId = crypto.randomBytes(10).toString("hex");
    } while (productsList.some((product) => product.id === newId));
    return newId;
  };
//--------------------------------------------------------------------------------

export const productsList = [{
    id:crypto.randomBytes(10).toString("hex"), title: "Mate", description: "Mate Marca Playadito", code: "Spooky", price: 3500, status: true, stock: 10, category: "Mates"
},{
    id:crypto.randomBytes(10).toString("hex"), title: "Cafe", description: "Cafe Marca Marley", code: "Jellypie", price: 4500, status: true, stock: 15, category: "Cafes"
},{
    id:crypto.randomBytes(10).toString("hex"), title: "Tecito", description: "Tecito Marca Supremo", code: "Funk", price: 5500, status: true, stock: 20, category: "Tecitos"
}];

//Ruta GET
router.get("/", (req, res) => {
    res.json(productsList);
});

router.get("/:pid", (req, res) => {
    const productId = req.params.pid;
    const productoEncontrado = productsList.find(identificador => identificador.id === productId);
    if (productoEncontrado){
        res.json(productoEncontrado)
    }else{
        res.json("No se encontró el producto")
    };
});

//Ruta POST
router.post("/", (req, res) => {
    const {title, description, code, price, status, stock, category} = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).send({ status: "error", error: "Valores incorrectos o faltan campos" });
    };

    const newProduct = {
        id: generateUniqueProductId(),
        title: title,
        description: description,
        code: code,
        price: price,
        status: true,
        stock: stock,
        category: category
    };
    //-------------------------------------

    productsList.push(newProduct);
    console.log("el producto creado es: ", newProduct);
    res.send({status:"success",message:"Producto creado"});
});

//Ruta DELETE
router.delete("/:pid", (req, res) => {
    const productId = req.params.pid;
    const productoEncontrado = productsList.findIndex(product => product.id === productId);

    if (productoEncontrado === -1) {
        return res.status(404).send({ status: "error", error: "Producto no encontrado" });
    };

    productsList.splice(productoEncontrado, 1);
    res.send({ status: "success", message: "Producto eliminado" });

})

//Ruta PUT

router.put("/:pid", (req, res) => {
    const productId = req.params.pid;
    const { title, description, code, price, status, stock, category } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).send({status: "error", error: "Faltan campos requeridos. Todos los campos deben estar presentes." })
    };

    const productoEncontrado = productsList.find(product => product.id === productId);

    if (productoEncontrado) {
        productoEncontrado.title = title;
        productoEncontrado.description = description;
        productoEncontrado.code = code;
        productoEncontrado.price = price;
        productoEncontrado.status = status;
        productoEncontrado.stock = stock;
        productoEncontrado.category = category;

        res.send({ status: "success", message: "Producto actualizado", product: productoEncontrado });
    }else{
        res.status(404).send({ status: "error", error: "Producto no encontrado" });
    }
});

export default router;