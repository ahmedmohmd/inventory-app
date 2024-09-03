import express from "express";

import * as ordersController from "./orders.controller";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import { validateRequestQuery } from "../common/middleware/validate-request-query.middleware";
import ordersValidationSchema from "./orders-validation-schema";

const ordersRouter = express.Router();

ordersRouter.get(
	"/",
	validateRequestQuery(ordersValidationSchema.findAllOrdersQuerySchema),
	ordersController.getAllOrders
);

ordersRouter.get(
	"/:id",
	validateRequestParams(ordersValidationSchema.orderIdSchema),
	ordersController.getSingleOrder
);

ordersRouter.post(
	"/",
	validateRequestBody(ordersValidationSchema.createOrderSchema),
	ordersController.createOrder
);

ordersRouter.patch(
	"/:id",
	validateRequestParams(ordersValidationSchema.orderIdSchema),
	validateRequestBody(ordersValidationSchema.changeOrderStateSchema),
	ordersController.updateOrderStatus
);

ordersRouter.delete(
	"/:id",
	validateRequestParams(ordersValidationSchema.orderIdSchema),
	ordersController.deleteOrder
);

export default ordersRouter;
