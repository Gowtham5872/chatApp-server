import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    roomId: { type: String, required: true },
    userId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true } // This will add createdAt and updatedAt fields
);

export default mongoose.model("Message", messageSchema);
