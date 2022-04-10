import express from "express";
const router = express.Router();

import {
  createSale,
  deleteSale,
  getAllSales,
  updateSale,
  showStats,
} from "../controllers/salesController.js";

router.route("/").post(createSale).get(getAllSales);
// remember about :id
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteSale).patch(updateSale);

export default router;
