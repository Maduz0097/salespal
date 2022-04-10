import Sale from "../models/Sale.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";
const createSale = async (req, res) => {
  const { position, company } = req.body;

  //   if (!position || !company) {
  //     throw new BadRequestError("Please provide all values");
  //   }
  //req.body.createdBy = req.user.userId;
  const sale = await Sale.create(req.body);
  res.status(StatusCodes.CREATED).json({ sale });
};
const getAllSales = async (req, res) => {
  const { status, saleType, sort, search } = req.query;

  const queryObject = {
    saleID: req.body.saleID,
  };
  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (saleType && saleType !== "all") {
    queryObject.saleType = saleType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Sale.find({});

  // chain sort conditions
  console.log(sort);

  result = result.sort("-createdAt");

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const sales = await result;

  const totalSales = await Sale.countDocuments();
  const numOfPages = Math.ceil(totalSales / limit);

  res.status(StatusCodes.OK).json({ sales, totalSales, numOfPages });
};
const updateSale = async (req, res) => {
  const { id: saleID } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  const sale = await Sale.findOne({ _id: saleID });

  if (!sale) {
    throw new NotFoundError(`No sale with id :${saleID}`);
  }
  // check permissions

  checkPermissions(req.user, sale.createdBy);

  const updatedSale = await Sale.findOneAndUpdate({ _id: saleID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedSale });
};
const deleteSale = async (req, res) => {
  const { id: saleID } = req.params;

  const sale = await Sale.findOne({ _id: saleID });

  if (!sale) {
    throw new NotFoundError(`No sale with id :${saleID}`);
  }

  //checkPermissions(req.user, sale.createdBy);

  await sale.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Sale removed" });
};
const showStats = async (req, res) => {
  let stats = await Sale.aggregate([
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

  let monthlyApplications = await Sale.aggregate([
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

export { createSale, deleteSale, getAllSales, updateSale, showStats };
