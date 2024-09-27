import { Application } from "express";
import handleAceessLogMiddleware from "../common/middleware/handle-aceess-log.middleware";

const handleAcessLogs = (app: Application) => {
	app.use(handleAceessLogMiddleware);
};

export default handleAcessLogs;
