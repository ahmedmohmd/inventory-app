import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as sectionsService from "./sections.service";

const findAllSections: RequestHandler = async (req, res) => {
	const allSections = await sectionsService.findAllSections();

	return res.status(StatusCodes.OK).json(allSections);
};

const findSingleSection: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const targetSection = await sectionsService.findSectionById(Number(id));

	return res.status(StatusCodes.OK).json(targetSection);
};

const createSection: RequestHandler = async (req, res) => {
	const sectionData = req.body;
	const createdSection = await sectionsService.insertSection(sectionData);

	return res.status(StatusCodes.CREATED).json(createdSection);
};

const updateSection: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const sectionData = req.body;

	await sectionsService.updateSection(Number(id), sectionData);

	return res.status(StatusCodes.CREATED);
};

const deleteSection: RequestHandler = async (req, res) => {
	const { id } = req.params;
	await sectionsService.deleteSection(Number(id));
	return res.status(StatusCodes.NO_CONTENT);
};

export {
	createSection,
	deleteSection,
	findAllSections,
	findSingleSection,
	updateSection,
};
