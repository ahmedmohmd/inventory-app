import createHttpError from "http-errors";
import * as suppliersRepository from "./suppliers.repository";
import { CreateSupplier } from "./suppliers.types";

const findAllSuppliers = async () => {
	return await suppliersRepository.findAllSuppliers();
};

const findSupplierById = async (id: number) => {
	const targetSupplier = await suppliersRepository.findSupplierById(id);

	if (!targetSupplier) {
		throw new createHttpError.NotFound(
			`Supplier with Id: ${id} not Found Exception.`
		);
	}

	return await suppliersRepository.findSupplierById(id);
};

const insertSupplier = async (data: CreateSupplier) => {
	const targetSupplier = await suppliersRepository.findSupplierByEmail(
		data.email
	);

	if (targetSupplier) {
		throw new createHttpError.BadRequest(
			` Supplier with Email: ${data.email} is already Exists.`
		);
	}

	return await suppliersRepository.insertSupplier(data);
};

const updateSupplier = async (id: number, data: CreateSupplier) => {
	const targetSupplier = await suppliersRepository.findSupplierById(id);

	if (!targetSupplier) {
		throw new createHttpError.NotFound(
			`Supplier with Id: ${id} not Found Exception.`
		);
	}

	return await suppliersRepository.updateSupplier(id, data);
};

const deleteSupplier = async (id: number) => {
	const targetSupplier = await suppliersRepository.findSupplierById(id);

	if (!targetSupplier) {
		throw new createHttpError.NotFound(
			`Supplier with Id: ${id} not Found Exception.`
		);
	}

	return await suppliersRepository.deleteSupplier(id);
};

export {
	deleteSupplier,
	findAllSuppliers,
	findSupplierById,
	insertSupplier,
	updateSupplier,
};
