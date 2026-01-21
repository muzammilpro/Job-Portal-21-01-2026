import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);
