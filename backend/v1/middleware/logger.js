
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

// Constants
const LOG_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const ACCESS_LOG_FILE = path.join(LOG_DIRECTORY, 'access.log');
const ERROR_LOG_FILE = path.join(LOG_DIRECTORY, 'error.log');
const LOG_FILE_FLAGS = { flags: 'a' };
const ERROR_MESSAGE = 'Something broke!';

// Define streams for logging
const accessLogStream = fs.createWriteStream(ACCESS_LOG_FILE, LOG_FILE_FLAGS);
const errorLogStream = fs.createWriteStream(ERROR_LOG_FILE, LOG_FILE_FLAGS);

/**
 * @swagger
 * components:
 *   parameters:
 *     - in: path
 *       name: req
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           method:
 *             type: string
 *             description: The HTTP method of the request.
 *           url:
 *             type: string
 *             description: The URL of the request.
 *       description: The request object.
 *     - in: path
 *       name: res
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           status:
 *             type: function
 *             description: Function to set the HTTP status code of the response.
 *           send:
 *             type: function
 *             description: Function to send the response.
 *       description: The response object.
 *     - in: path
 *       name: next
 *       required: true
 *       schema:
 *         type: function
 *         description: Function to call the next middleware in the stack.
 *       description: The next middleware function.
 */

/**
 * Logs the request method and URL.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const logger = (req, res, next) => {
  accessLogStream.write(`[${new Date().toISOString()}] ${req.method} ${req.url}\n`);
  next();
};

/**
 * Logs errors along with the action that caused them.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorLogger = (err, req, res, next) => {
  errorLogStream.write(`[${new Date().toISOString()}] ${err.message || err.toString()} - ${req.method} ${req.url}\n`);
  next(err);
};

/**
 * Handles errors by logging them and sending a response.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE);
};

export { logger, errorLogger, errorHandler };
