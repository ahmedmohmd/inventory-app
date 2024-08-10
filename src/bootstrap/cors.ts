import cors, { CorsOptions } from "cors";
import { Application } from "express";

const corsOptions: CorsOptions = {
	origin: "*",
};

const handleCors = (app: Application) => {
	app.use(cors(corsOptions));
};

export default handleCors;
