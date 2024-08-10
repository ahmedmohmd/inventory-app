import { Application } from "express";
import helmet from "helmet";

const handleSecurity = (app: Application) => {
	app.use(helmet());
};

export default handleSecurity;
