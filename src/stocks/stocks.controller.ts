import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import stocksService from "./stocks.service";

const findAllStocks: RequestHandler = async (__, res) => {
	const stocks = await stocksService.findAllStocks();

	return res.status(StatusCodes.OK).json(stocks);
};

const findSingleStock: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const stock = await stocksService.findStockById(Number(id));

	return res.status(StatusCodes.OK).json(stock);
};

const createStock: RequestHandler = async ({ body }, res) => {
	const createdStock = await stocksService.insertStock(body);

	return res.status(StatusCodes.CREATED).json(createdStock);
};

const updateStock: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const stockData = req.body;

	await stocksService.updateStock(Number(id), stockData);

	return res.status(StatusCodes.CREATED).send();
};

const deleteStock: RequestHandler = async (req, res) => {
	const { id } = req.params;

	await stocksService.deleteStock(Number(id));

	return res.status(StatusCodes.NO_CONTENT).send();
};

export {
	createStock,
	deleteStock,
	findAllStocks,
	findSingleStock,
	updateStock,
};
