import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const serviceproviderSchema = new mongoose.Schema(
  {
    SellerName: {
      type: String,
      required: true,
      trim: true,
    },
    SellerEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    SellerPassword: {
      type: String,
      required: true,
      trim: true,
    },
    Service: {
      type: String,
      required: true,
      trim: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Coverphoto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service_Provider = mongoose.model(
  "Service_Provider",
  serviceproviderSchema
);
export default Service_Provider;
