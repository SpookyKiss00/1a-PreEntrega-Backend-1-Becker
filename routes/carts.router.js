import {Router} from "express";
import crypto from "crypto";
import { productsList } from "./products.router.js";

const router = Router();

// Función para generar un ID único----------------------------------------------
const generateUniqueCartId = () => {
    let newId;
    do {
      newId = crypto.randomBytes(10).toString("hex");
    } while (cartsList.some((cart) => cart.id === newId));
    return newId;
  };
//--------------------------------------------------------------------------------

const cartsList = [{
    id:crypto.randomBytes(12).toString("hex"), products: [{
        product: productsList[0].id,
        quantity: 1,
      }]
},{
    id:crypto.randomBytes(12).toString("hex"), products: [{
        product: productsList[1].id,
        quantity: 2,
      },
      {
        product: productsList[2].id,
        quantity: 1,
      }]
}];


//Ruta GET
router.get("/", (req, res) => {
    res.json(cartsList);
});

router.get("/:cid", (req, res) => {
    const cartId = req.params.cid;
    const cartFound = cartsList.find((cart) => cart.id === cartId);

    if (!cartFound) {
        return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    };

    res.json(cartFound);
});

//Ruta Post Cid Pid
router.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
  
    const cart = cartsList.find((cart) => cart.id === cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    };
  
    const product = productsList.find((prod) => prod.id === pid);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    };
  
    const productInCart = cart.products.find((prod) => prod.product === pid);
    if (productInCart) {
      productInCart.quantity += 1;
      return res.json({ status: "success", message: "Producto añadido al carrito", cart });
    };
  
    cart.products.push({ product: pid, quantity: 1 });
  
    return res.json({ status: "success", message: "Producto añadido al carrito", cart });
  });

//Ruta POST
router.post("/", (req, res) => {
  
  const newCart = {
      id: generateUniqueCartId(),
      products: []
  };

  cartsList.push(newCart);
  res.status(201).json({ status: "success", message: "Carrito creado", cart: newCart });
});

export default router;