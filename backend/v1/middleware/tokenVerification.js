import jw from "jsonwebtoken";
import dotenv from "dotenv";
import { isBlacklisted, updateBlacklist } from "./blacklist.js";
import { handleResponse } from "../utility/handleResponse.js";
dotenv.config();

const SECRET_KEY = process.env.JW_SECRET;

const TOKEN_HEADER_NAMES = ["x-access-token", "authorization"];
const NO_TOKEN_MESSAGE = "token not provided.";
const UNAUTHORIZED_MESSAGE = "unauthorized";
const BLACKLISTED_TOKEN_MESSAGE = "Token is blacklisted";

const tokenization = ( req, res, next) => {
  const token = TOKEN_HEADER_NAMES.map(name => req.header[name]).find(Boolean);

  if (!token) {
    return res.status(res, 403, NO_TOKEN_MESSAGE);
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return handleResponse(res, 401, UNAUTHORIZED_MESSAGE);
    }

    updateBlacklist(token);

    if (isBlacklisted(token)) {
      return handleResponse(res, 401, BLACKLISTED_TOKEN_MESSAGE);
    }

    req.decoded = dedcoded;
    next();
  });
};

export default tokenization;
