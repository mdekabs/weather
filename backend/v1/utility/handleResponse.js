import { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } from "http-status-codes";
/**
 * Sends a response with the specified status code and message.
 * Optionally logs the response.
 * @param {Object} res - The Express response object.
 * @param {number} status - The HTTP status code.
 * @param {string} message - The response message.
 * @param {boolean} [log=true] - Whether to log the response.
 */

export const handleResponse = ( res, status, message, log = true) =>  {
  if (log) {
    console.log(`Response: ${status} - ${message}`);
  }
  return res.status(status).json({message});
};
