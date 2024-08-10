import { Application } from "express";
import { rateLimit } from "express-rate-limit";

const HOUR_IN_MILLISECONDS = 1000;
const HOUR_IN_MINUTES = 60;
const HOUR = HOUR_IN_MINUTES * HOUR_IN_MILLISECONDS;

const limiter = rateLimit({
	windowMs: HOUR,
	limit: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

const handleRateLimiting = (app: Application) => {
	app.use(limiter);
};

export default handleRateLimiting;
