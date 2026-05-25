import express from "express"
import { CreateProduct,getProducts,getProduct,updateProduct,deleteProduct } from "../controllers/productController.js";
const router = express.Router()


router.get("/",getProducts)
router.get("/:id",getProduct)
router.post("/",CreateProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)



export default router