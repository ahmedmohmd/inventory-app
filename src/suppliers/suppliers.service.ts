import createHttpError from "http-errors";
import suppliersRepository from "./suppliers.repository";
import { CreateSupplier, FindAllSuppliersQuery } from "./suppliers.types";
import { config } from "../../config/config";

const findAllSuppliers = async (query: FindAllSuppliersQuery) => {
	const suppliers = await suppliersRepository.findAllSuppliers(query);

	const currentPage = Number(query.page) || config.pagination.page;
	const pageSize = Number(query.limit) || config.pagination.limit;
	const totalCount = await suppliersRepository.countAllSuppliers();
	const totalPages = Math.ceil(totalCount / pageSize);
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;
	const prevPage = currentPage > 1 ? currentPage - 1 : null;

	return {
		pagination: {
			page_size: pageSize,
			total_count: totalCount,
			total_pages: totalPages,
			current_page: currentPage,
			next_page: nextPage,
			prev_page: prevPage,
		},

		data: suppliers,
	};
};

/**
 * Retrieves a supplier by their unique identifier.
 *
 * @param {number} id - The unique identifier of the supplier to retrieve.
 * @return {Promise<object>} The supplier object if found, otherwise throws a NotFound error.
 */
const findSupplierById = async (id: number) => {
	const supplier = await suppliersRepository.findSupplierById(id);

	if (!supplier) {
		throw new createHttpError.NotFound(`Supplier with Id: ${id} not Found.`);
	}

	return await suppliersRepository.findSupplierById(id);
};

/**
 * Inserts a new supplier into the database after checking for existing suppliers with the same email address.
 *
 * @param {CreateSupplier} data - The data for the new supplier to be inserted.
 * @return {Promise<object>} The newly inserted supplier object.
 */
const insertSupplier = async (data: CreateSupplier) => {
	const supplier = await suppliersRepository.findSupplierByEmail(data.email);

	if (supplier) {
		throw new createHttpError.BadRequest(
			` Supplier with Email: ${data.email} already Exists.`
		);
	}

	return await suppliersRepository.insertSupplier(data);
};

/**
 * Updates a supplier in the database with the given ID.
 *
 * @param {number} id - The unique identifier of the supplier to update.
 * @param {CreateSupplier} data - The updated supplier data.
 * @return {Promise<object>} A promise that resolves to the updated supplier object.
 */
const updateSupplier = async (id: number, data: CreateSupplier) => {
	const supplier = await suppliersRepository.findSupplierById(id);

	if (!supplier) {
		throw new createHttpError.NotFound(`Supplier with Id: ${id} not Found.`);
	}

	return await suppliersRepository.updateSupplier(id, data);
};

/**
 * Deletes a supplier by their ID from the database.
 *
 * @param {number} id - The unique identifier of the supplier to delete.
 * @return {Promise<void>} A promise that resolves with the result of the deletion operation.
 */
const deleteSupplier = async (id: number) => {
	const supplier = await suppliersRepository.findSupplierById(id);

	if (!supplier) {
		throw new createHttpError.NotFound(`Supplier with Id: ${id} not Found.`);
	}

	return await suppliersRepository.deleteSupplier(id);
};

export default {
	deleteSupplier,
	findAllSuppliers,
	findSupplierById,
	insertSupplier,
	updateSupplier,
};
