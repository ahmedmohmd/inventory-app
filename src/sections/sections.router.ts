import express from "express";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import * as sectionsController from "./sections.controller";
import {
	createSectionSchema,
	sectionIdSchema,
	updateSectionSchema,
} from "./sections.validation-schema";

const sectionsRouter = express.Router();

sectionsRouter.get("/", sectionsController.findSingleSection);

sectionsRouter.get(
	"/:id",
	validateRequestParams(sectionIdSchema),
	sectionsController.findSingleSection
);

sectionsRouter.post(
	"/",
	validateRequestBody(createSectionSchema),
	sectionsController.createSection
);

sectionsRouter.patch(
	"/:id",
	validateRequestParams(sectionIdSchema),
	validateRequestBody(updateSectionSchema),
	sectionsController.updateSection
);

sectionsRouter.delete(
	"/:id",
	validateRequestParams(sectionIdSchema),
	sectionsController.deleteSection
);

export { sectionsRouter };
