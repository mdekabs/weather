import rateLimit from "express-rate-limit";
const FIFTEEN_MINUTES_IN_MS =  15 *  60 *  1000;
const MAX = 100;
const limiter = rateLimit({
  windowMs: FIFTEEN_MINUTES_IN_MS,
  max: MAX,
  message: "Try later, too many request now"
});

export default limiter;
