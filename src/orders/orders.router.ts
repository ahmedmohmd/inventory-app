import express from "express";

import * as ordersController from "./orders.controller";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import {
	changeOrderStateSchema,
	createOrderSchema,
	findAllOrdersQuerySchema,
	orderIdSchema,
} from "./orders-validation-schema";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import { validateRequestQuery } from "../common/middleware/validate-request-query.middleware";

const ordersRouter = express.Router();

ordersRouter.get(
	"/",
	validateRequestQuery(findAllOrdersQuerySchema),
	ordersController.getAllOrders
);

ordersRouter.get(
	"/:id",
	validateRequestParams(orderIdSchema),
	ordersController.getSingleOrder
);

ordersRouter.post(
	"/",
	validateRequestBody(createOrderSchema),
	ordersController.createOrder
);

ordersRouter.patch(
	"/:id",
	validateRequestParams(orderIdSchema),
	validateRequestBody(changeOrderStateSchema),
	ordersController.updateOrderStatus
);

ordersRouter.delete(
	"/:id",
	validateRequestParams(orderIdSchema),
	ordersController.deleteOrder
);

export { ordersRouter };
