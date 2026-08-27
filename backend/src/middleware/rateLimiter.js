import rateLimit from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-ip");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later!" });
    }
    next();
  } catch (error) {
    console.error('Error in "rateLimiter" middleware =>', error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export default rateLimiter;

/*
const requests = {};
const WINDOW_DURATION_MS = 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimiter = (req, res, next) => {
  const windowStart = Date.now();

  const { ip } = req;
  if (!requests[ip]) {
    requests[ip] = {
      windowStart,
      count: 1
    };
    return next();
  }

  const windowStartDiff = windowStart - requests[ip].windowStart;
  const ipData = requests[ip];
  if (windowStartDiff >= WINDOW_DURATION) {
    ipData.windowStart = windowStart;
    ipData.count = 1;
  } else if (ipData.count >= MAX_REQUESTS) {
    return res.status(429).json({
      message: "Too many requests"
    });
  } else {
    ipData.count += 1;
  }

  next();
};

export default rateLimiter;

*/
