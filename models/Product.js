import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [false, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
