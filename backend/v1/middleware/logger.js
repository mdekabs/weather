import fs from "fs";
import path from "path";
const accessLogStream = fs.createWriteStream(path.join(__dirname, "file.log"), { flags: "a" });
const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });
const logger = (req, res, next) => {
  accessLogStream.write(`[${new Date().toISOString()}] ${req.method} ${req.url}\n`);
  next();
};

const errorLogger = (err, req, res, next) => {
  errorLogStream.write(`[${new Date().toISOString()}] ${err.message} - ${req.method} ${req.url}\n`);
  next(err);
};

export { logger, errorLogger };
