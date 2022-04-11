import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";
const createProduct = async (req, res) => {
  const { position, company } = req.body;

  //   if (!position || !company) {
  //     throw new BadRequestError("Please provide all values");
  //   }
  //req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const { status, productType, sort, search } = req.query;

  const queryObject = {
    productID: req.body.productID,
  };
  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (productType && productType !== "all") {
    queryObject.productType = productType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Product.find({});

  // chain sort conditions

  result = result.sort("-createdAt");

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  const totalProducts = await Product.countDocuments();
  const numOfPages = Math.ceil(totalProducts / limit);

  res.status(StatusCodes.OK).json({ products, totalProducts, numOfPages });
};
const updateProduct = async (req, res) => {
  const { id: productID } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  const product = await Product.findOne({ _id: productID });

  if (!product) {
    throw new NotFoundError(`No product with id :${productID}`);
  }
  // check permissions

  checkPermissions(req.user, product.createdBy);

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedProduct });
};
const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOne({ _id: productID });

  if (!product) {
    throw new NotFoundError(`No product with id :${productID}`);
  }

  // checkPermissions(req.user, product.createdBy);

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Product removed" });
};
const showStats = async (req, res) => {
  let stats = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Product.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  showStats,
};
