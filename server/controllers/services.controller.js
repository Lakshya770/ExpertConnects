import mongoose from "mongoose";
import Service from "../models/Service.model.js";

export const putservices = async (req, res) => {
  const {
    Category,
    Specialisedin,
    Experience,
    Title,
    Price,
    Description,
    Coverphotouser,
    serviceprovider,
  } = req.body;

  console.log(req.body);

  if (!Category) {
    return res
      .status(400)
      .json({ message: "Mention the Service you are providing " });
  }
  if (!Experience) {
    return res.status(400).json({ message: "Mention the Experience " });
  }
  if (!Title) {
    return res.status(400).json({ message: "Add a Title of your service" });
  }

  if (!Price) {
    return res
      .status(400)
      .json({ message: "Mention the Price of your service" });
  }
  if (!Description) {
    return res
      .status(400)
      .json({ message: "Mention the Description of your service" });
  }
  if (!Coverphotouser) {
    return res
      .status(400)
      .json({ message: "Mention the Cover photo of your service" });
  }

  try {
    const initializingslot = () => {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const time = [6, 8, 10];
      const slots = [];

      days.forEach((day) => {
        time.forEach((time) => {
          slots.push({ day, time, isbooked: false });
        });
      });
      return slots;
    };

    const newservice = await Service.create({
      Category,
      Specialisedin,
      Experience,
      Title,
      Price,
      Description,
      Coverphotouser,
      Slots: initializingslot(),
      serviceprovider,
    });

    if (!newservice) {
      return res
        .status(400)
        .json({ message: "Something went wrong while creating model" });
    }

    const finduser = await Service.findById(newservice._id);

    if (!finduser) {
      return res
        .status(400)
        .json({ message: "Something went wrong while fetching" });
    }

    return res
      .status(200)
      .json({ message: "Service added successfully", serviceadded: finduser });
  } catch (error) {
    console.log(error);
  }
};

export const getservices = async (req, res) => {
  try {
    const sellerid = req.params.id;
    const servicesofseller = await Service.find({
      serviceprovider: sellerid,
    }).populate("serviceprovider");

    if (!servicesofseller) {
      return res
        .status(400)
        .json({ message: "This seller does not have any services to show" });
    }

    return res
      .status(200)
      .json({
        message: "Services fetched successfully",
        services: servicesofseller,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong", error: error });
  }
};

export const getservicesbyname = async (req, res) => {
  const ctg = req.params.name;
  console.log(ctg);
  try {
    if (req.params.name === "All") {
      const cards = await Service.find().populate("serviceprovider");
      if (!cards) {
        return res.status(400).json({ message: "No service" });
      }
      return res
        .status(200)
        .json({ message: "Services fetched successfully", services: cards });
    }

    const cards = await Service.find({ Category: req.params.name }).populate(
      "serviceprovider"
    );
    if (!cards) {
      return res.status(400).json({ message: "No service" });
    }
    console.log(cards);
    return res
      .status(200)
      .json({ message: "Services fetched successfully", services: cards });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong gbhvjjty", error: error });
  }
};

export const serviceforsearchbar = async (req, res) => {
  const ctg = req.params.searchtext;
  console.log(ctg);
  try {
    if (req.params.searchtext === "All") {
      const cards = await Service.find().populate("serviceprovider");
      if (!cards) {
        return res.status(400).json({ message: "No service" });
      }
      return res
        .status(200)
        .json({ message: "Services fetched successfully", services: cards });
    }

    const regex = new RegExp(ctg, "i"); // 'i' for case-insensitive matching
    const cards = await Service.find({
      $or: [
        { Category: { $regex: regex } },
        { Specialisedin: { $regex: regex } },
      ],
    }).populate("serviceprovider");

    if (!cards) {
      return res.status(400).json({ message: "No service" });
    }
    console.log(cards);
    return res
      .status(200)
      .json({ message: "Services fetched successfully", services: cards });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong ", error: error });
  }
};

export const myservices = async (req, res) => {
  const id = req.params.id;
  const myservices = await Service.find({ serviceprovider: id }).populate(
    "serviceprovider"
  );

  if (!myservices) {
    return res.status(200).json({ message: "No service", code: 404 });
  }

  return res
    .status(200)
    .json({
      message: "Services fetched successfully",
      services: myservices,
      code: 0,
    });
};
