import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  productID: {
    type: Number,
    required: [true, "Please provide productID"],
    maxlength: 50,
  },
  productName: {
    type: String,
    required: [true, "Please provide productName"],
    maxlength: 100,
  },
  category: {
    type: String,
    required: [true, "Please provide category"],
    maxlength: 20,
  },
  unitPrice: {
    type: Number,
    required: [true, "Please provide unit price"],
    maxlength: 50,
  },
  qtyInStock: {
    type: Number,
    required: [true, "Please provide qty in stock"],
    maxlength: 10,
  },
  quantity: {
    type: Number,
    required: [false],
  },
  subTotal: {
    type: Number,
    required: [false],
  },
});
const SaleSchema = new mongoose.Schema(
  {
    saleID: {
      type: Number,
      required: [true, "Please provide SaleID"],
      maxlength: 50,
    },
    total: {
      type: Number,
      required: [false],
    },
    products: [subSchema],
  },
  { timestamps: true }
);
export default mongoose.model("Sale", SaleSchema);
