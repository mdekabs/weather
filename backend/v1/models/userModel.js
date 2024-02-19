import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type:Date,
    default:Date.now
  },
  email: {
    type:String,
    required:true,
    unique:true,
  },
  password: {
    type:String,
    required:true,
  },
  username: {
    type:String,
    required:true
  },
  profilePicUrl: {
    type:String
  },
  notificationList: [
    {
      type:Object
    }
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
