import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as suppliersService from "./suppliers.service";

const findAllSuppliers: RequestHandler = async (req, res) => {
	const allSuppliers = await suppliersService.findAllSuppliers();

	return res.status(StatusCodes.OK).json(allSuppliers);
};

const findSingleSupplier: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const targetSupplier = await suppliersService.findSupplierById(Number(id));

	return res.status(StatusCodes.OK).json(targetSupplier);
};

const createSupplier: RequestHandler = async (req, res) => {
	const supplierData = req.body;
	const createdSupplier = await suppliersService.insertSupplier(supplierData);

	return res.status(StatusCodes.CREATED).json(createdSupplier);
};

const updateSupplier: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const supplierData = req.body;

	await suppliersService.updateSupplier(Number(id), supplierData);

	return res.status(StatusCodes.CREATED);
};

const deleteSupplier: RequestHandler = async (req, res) => {
	const { id } = req.params;
	await suppliersService.deleteSupplier(Number(id));
	return res.status(StatusCodes.NO_CONTENT);
};

export {
	createSupplier,
	deleteSupplier,
	findAllSuppliers,
	findSingleSupplier,
	updateSupplier,
};
