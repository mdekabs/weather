
import mongoose from "mongoose";

/**
 * @typedef {Object} Notification
 * @property {string} message - The notification message
 */

/**
 * @typedef {Object} UserSchema
 * @property {Date} created_at - The date the user was created (default: Date.now)
 * @property {Date} updated_at - The date the user was last updated (default: Date.now)
 * @property {string} email - The email address of the user (required, unique)
 * @property {string} password - The password of the user (required)
 * @property {string} username - The username of the user (required)
 * @property {string} profilePicUrl - The URL of the user's profile picture
 * @property {Notification[]} notificationList - The list of notifications for the user
 */

/**
 * Mongoose schema for user documents
 * @type {UserSchema}
 */
const userSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
    description: "The date the user was created"
  },
  updated_at: {
    type: Date,
    default: Date.now,
    description: "The date the user was last updated"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    description: "The email address of the user"
  },
  password: {
    type: String,
    required: true,
    description: "The password of the user"
  },
  username: {
    type: String,
    required: true,
    description: "The username of the user"
  },
  profilePicUrl: {
    type: String,
    description: "The URL of the user's profile picture"
  },
  notificationList: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
    description: "The list of notifications for the user"
  }
});

/**
 * Mongoose model for the User schema
 * @typedef {import('mongoose').Model<UserSchema>} User
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         profilePicUrl:
 *           type: string
 *           description: The URL of the user's profile picture
 *         notificationList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notification'
 *           description: The list of notifications for the user
 */

const User = mongoose.model("User", userSchema);

export default User;
