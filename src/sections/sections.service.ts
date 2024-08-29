import createHttpError from "http-errors";
import { CreateSection } from "./section.types";
import * as sectionsRepository from "./sections.repository";

export const findAllSections = async () => {
	return await sectionsRepository.findAllSections();
};

export const findSectionById = async (id: number) => {
	const targetSection = await sectionsRepository.findSectionById(id);

	if (!targetSection) {
		throw new createHttpError.NotFound(
			`Section with Id: ${id} not Found Exception.`
		);
	}

	return await sectionsRepository.findSectionById(id);
};

export const insertSection = async (data: CreateSection) => {
	const targetSection = await sectionsRepository.findSectionByName(data.name);

	if (targetSection) {
		throw new createHttpError.BadRequest(
			` Section with Name: ${data.name} is already Exists.`
		);
	}

	return await sectionsRepository.insertSection(data);
};

export const updateSection = async (id: number, data: CreateSection) => {
	const targetSection = await sectionsRepository.findSectionById(id);

	if (!targetSection) {
		throw new createHttpError.NotFound(
			`Section with Id: ${id} not Found Exception.`
		);
	}

	return await sectionsRepository.updateSection(id, data);
};

export const deleteSection = async (id: number) => {
	const targetSection = await sectionsRepository.findSectionById(id);

	if (!targetSection) {
		throw new createHttpError.NotFound(
			`Section with Id: ${id} not Found Exception.`
		);
	}

	return await sectionsRepository.deleteSection(id);
};
