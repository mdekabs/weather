import mongoose from "mongoose";
import User from "./userModel.js";
const weatherHistorySchema = new mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true
  },
  city: {
    type:String,
    required:true
  },
  temperature: {
    type:Number,
    required:true
  },
  humidity: {
    type:Number,
    required:true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const weatherHistory = mongoose.model("weatherHistory", weatherHistorySchema);
export default weatherHistory;
