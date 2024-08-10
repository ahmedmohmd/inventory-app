import compression from "compression";
import { Application } from "express";

const handleCompression = (app: Application) => {
	app.use(compression());
};

export default handleCompression;
