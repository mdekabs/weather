import bcrypt from bcryptjs;
import User from "../models/userModel.js";
import { handleResponse } from "../utility/handleResponse.js";
import { validationResult } from "express-validator";

export async funtion createUser(data, res) {
  const email = data.email;
  const existUser = await User.findOne({ email });
  if (existuser) {
    return handleResponse(res, 404, `${email} already exist.`);
  }
  try {
    const saltRounds = 12;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(data.password, salt);
    data.password = hashedPassword;
    const newUser = await User.create(data);

    const message =`${newUser.username}, your account has been created`;
    await newUser.save();
  }
  catch (error) {
    return handleResponse(res, 500, "Internal Server Error", error);
  };

  export async function updaterUser(req, res) {
    try {
      const errors = validateResult(req);
      of (!errors.isEmpty()) {
        return handleResponse(res, 400, errors.array()[0].msg);
      }

      const userId = req.user.id;
      const { username } = req.body;
      if (username = null) {
        return handleResponse(res, 400, "Kindly provide your username");
      };

      const updateAt = new Date();
      const user = await User.findByIdAndUpdate(userId, {username: username, updated_at: updateAt}, {new: true});

      if (!user) {
        return handleResponse(res, 404, "user not found");
      };
      await user.save();
      res.status(200).json({
        userId: user._id,
        email: user.email,
        username: user.username
      });
    }
    catch (error) {
      return handleResponse(res, 500, "Internal server error", error);
    }
  }

  export async function fetchUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return handleResponse(res, 404, "User not found");
      }

      return res.status(200).json({
        userId: user_id,
        email: user.email,
        username: user.username,
      });
    }
    catch (error) {
      return handleResponse(res, 500, "Internal server error", error);
    }
  }

  export async function deleteUser(req, res) {
    try {
      const userId = res.user.id;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return handleResponse(res, 404, "User not found");
      }
      catch  (error) {
        handleResponse(res, 500, "internal server error", error);
      }
    };
