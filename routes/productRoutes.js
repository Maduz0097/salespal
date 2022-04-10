import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  showStats,
} from "../controllers/productsController.js";

router.route("/").post(createProduct).get(getAllProducts);
// remember about :id
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteProduct).patch(updateProduct);

export default router;
