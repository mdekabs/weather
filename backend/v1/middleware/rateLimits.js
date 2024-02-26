import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100,
  message: Try later, too many request now,
});

export default limiter;
