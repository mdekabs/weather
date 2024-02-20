
import mongoose from "mongoose";
import User from "./userModel.js";

/**
 * @typedef {Object} User
 * @property {mongoose.Types.ObjectId} _id - The unique identifier of the user
 * @property {string} email - The email address of the user
 * @property {string} username - The username of the user
 */

/**
 * @typedef {Object} WeatherHistorySchema
 * @property {mongoose.Types.ObjectId} userId - The user ID associated with the weather history
 * @property {string} city - The city for which weather history is recorded
 * @property {number} temperature - The temperature recorded for the city
 * @property {number} humidity - The humidity recorded for the city
 * @property {Date} timestamp - The timestamp of when the weather history was recorded
 */

/**
 * Mongoose schema for weather history documents
 * @type {WeatherHistorySchema}
 */
const weatherHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
    description: "The user ID associated with the weather history"
  },
  city: {
    type: String,
    required: true,
    description: "The city for which weather history is recorded"
  },
  temperature: {
    type: Number,
    required: true,
    description: "The temperature recorded for the city"
  },
  humidity: {
    type: Number,
    required: true,
    description: "The humidity recorded for the city"
  },
  timestamp: {
    type: Date,
    default: Date.now,
    description: "The timestamp of when the weather history was recorded"
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     WeatherHistory:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The user ID associated with the weather history
 *         city:
 *           type: string
 *           description: The city for which weather history is recorded
 *         temperature:
 *           type: number
 *           description: The temperature recorded for the city
 *         humidity:
 *           type: number
 *           description: The humidity recorded for the city
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the weather history was recorded
 */

/**
 * Mongoose model for the weather history schema
 * @typedef {import('mongoose').Model<WeatherHistorySchema>} WeatherHistory
 */

/**
 * Model representing weather history data
 * @type {WeatherHistory}
 */
const weatherHistory = mongoose.model("weatherHistory", weatherHistorySchema);

export default weatherHistory;
