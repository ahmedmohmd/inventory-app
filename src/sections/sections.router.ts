import express from "express";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import * as sectionsController from "./sections.controller";
import sectionsValidationSchema from "./sections.validation-schema";

const sectionsRouter = express.Router();

sectionsRouter.get("/", sectionsController.findAllSections);

sectionsRouter.get(
	"/:id",
	validateRequestParams(sectionsValidationSchema.sectionIdSchema),
	sectionsController.findSingleSection
);

sectionsRouter.post(
	"/",
	validateRequestBody(sectionsValidationSchema.createSectionSchema),
	sectionsController.createSection
);

sectionsRouter.patch(
	"/:id",
	validateRequestParams(sectionsValidationSchema.sectionIdSchema),
	validateRequestBody(sectionsValidationSchema.updateSectionSchema),
	sectionsController.updateSection
);

sectionsRouter.delete(
	"/:id",
	validateRequestParams(sectionsValidationSchema.sectionIdSchema),
	sectionsController.deleteSection
);

export { sectionsRouter };
