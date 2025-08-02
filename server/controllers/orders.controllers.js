import Order from "../models/order.model.js";

export const userorders = async (req, res) => {
  const data = await Order.find({ orderbyUser: req.params.id })
    .populate("orderbyUser")
    .populate("orderfromServiceProvider")
    .populate("service")
    .select("-boolnum -orderbySeller");

  if (data.length === 0) {
    return res.status(404).send("No order found by user");
  }
  return res
    .status(200)
    .json({ message: "Orders fetched successfully", data, code: 200 });
};

export const sellerorders = async (req, res) => {
  const data = await Order.find({ orderbySeller: req.params.id })
    .populate("orderbySeller")
    .populate("orderfromServiceProvider")
    .populate("service")
    .select("-boolnum -orderbyUser");

  if (data.length === 0) {
    return res
      .status(200)
      .json({ message: "No order found by This seller", code: 404 });
  }

  return res
    .status(200)
    .json({ message: "Orders fetched successfully", data, code: 200 });
};

export const getclients = async (req, res) => {
  const carddetails = await Order.find({
    orderfromServiceProvider: req.params.id,
  })
    .populate("orderbyUser")
    .populate("service")
    .populate("orderbySeller")
    .populate("orderfromServiceProvider");

  if (carddetails.length === 0) {
    return res
      .status(200)
      .json({ message: "No clients found for the user", code: 404 });
  }

  return res.status(200).json({ myclients: carddetails, code: 200 });
};
