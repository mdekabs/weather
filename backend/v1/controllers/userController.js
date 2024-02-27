
import bcryptjs from 'bcryptjs';
const { genSalt, hash } = bcryptjs;
import User from "../models/userModel.js";
import { handleResponse } from "../utility/handleResponse.js";
import { validationResult } from "express-validator";

// Constants
const SALT_ROUNDS =  12;
const USER_NOT_FOUND_MESSAGE = "User not found";
const INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server Error";
const USER_ALREADY_EXISTS_MESSAGE = "User already exists.";
const USER_CREATED_MESSAGE = "Your account has been created";
const USER_UPDATED_MESSAGE = "User updated successfully";
const USER_DELETED_MESSAGE = "User deleted successfully";

/**
 * Creates a new user account.
 * @async
 * @param {Object} data - The user data.
 * @param {Object} res - The Express response object.
 * @returns {Promise<Object>} The response object with the user creation status and message.
 */
export async function createUser(data, res) {
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return handleResponse(res,  400, { message: USER_ALREADY_EXISTS_MESSAGE });
    }

    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(data.password, salt);

    const user = new User({
      ...data,
      password: hashedPassword,
    });

    await user.save();
    return handleResponse(res,  201, { message: USER_CREATED_MESSAGE });
  } catch (error) {
    console.error(error);
    return handleResponse(res,  500, { message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
}

/**
 * Updates an existing user's information.
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<Object>} The response object with the user update status and message.
 */
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return handleResponse(res,  404, { message: USER_NOT_FOUND_MESSAGE });
    }

    return handleResponse(res,  200, { message: USER_UPDATED_MESSAGE });
  } catch (error) {
    console.error(error);
    return handleResponse(res,  500, { message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
}

/**
 * Fetches the details of a specific user.
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<Object>} The response object with the user details.
 */
export async function fetchUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return handleResponse(res,  404, { message: USER_NOT_FOUND_MESSAGE });
    }

    return handleResponse(res,  200, user);
  } catch (error) {
    console.error(error);
    return handleResponse(res,  500, { message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
}

/**
 * Deletes a user account.
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<Object>} The response object with the user deletion status and message.
 */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return handleResponse(res,  404, { message: USER_NOT_FOUND_MESSAGE });
    }

    return handleResponse(res,  200, { message: USER_DELETED_MESSAGE });
  } catch (error) {
    console.error(error);
    return handleResponse(res,  500, { message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
}
