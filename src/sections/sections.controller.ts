import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import sectionsService from "./sections.service";

/**
 * Retrieves all sections from the sections service and sends them as a JSON response.
 *
 * @param {Request} __ - The Express request object (unused).
 * @param {Response} res - The Express response object.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const findAllSections: RequestHandler = async (__, res) => {
	const sections = await sectionsService.findAllSections();

	return res.status(StatusCodes.OK).json(sections);
};

/**
 * Retrieves a single section by its ID from the sections service and sends it as a JSON response.
 *
 * @param {Request} req - The Express request object containing the section ID as a path parameter.
 * @param {Response} res - The Express response object used to send the section data.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const findSingleSection: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const section = await sectionsService.findSectionById(Number(id));

	return res.status(StatusCodes.OK).json(section);
};

/**
 * Creates a new section by inserting it into the database.
 *
 * @param {object} body - The request body containing the new section data.
 * @param {Response} res - The Express response object used to send the newly created section data.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const createSection: RequestHandler = async ({ body }, res) => {
	const createdSection = await sectionsService.insertSection(body);

	return res.status(StatusCodes.CREATED).json(createdSection);
};

/**
 * Updates a section by its ID.
 *
 * @param {Request} req - The Express request object containing the section ID as a path parameter and the updated section data in the request body.
 * @param {Response} res - The Express response object used to send the response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const updateSection: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const sectionData = req.body;

	await sectionsService.updateSection(Number(id), sectionData);

	return res.status(StatusCodes.CREATED).send();
};

/**
 * Deletes a section from the database.
 *
 * @param {Request} req - The Express request object containing the section ID as a path parameter.
 * @param {Response} res - The Express response object used to send the response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const deleteSection: RequestHandler = async (req, res) => {
	const { id } = req.params;

	await sectionsService.deleteSection(Number(id));

	return res.status(StatusCodes.NO_CONTENT).send();
};

export {
	createSection,
	deleteSection,
	findAllSections,
	findSingleSection,
	updateSection,
};
