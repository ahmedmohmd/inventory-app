import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import stocksService from "./stocks.service";

/**
 * Retrieves all stocks from the stocks service and sends them as a JSON response.
 *
 * @param {Request} __ - The Express request object (unused).
 * @param {Response} res - The Express response object.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const findAllStocks: RequestHandler = async (__, res) => {
	const stocks = await stocksService.findAllStocks();

	return res.status(StatusCodes.OK).json(stocks);
};

/**
 * Retrieves a single stock by its ID from the stocks service and sends it as a JSON response.
 *
 * @param {Request} req - The Express request object containing the stock ID as a path parameter.
 * @param {Response} res - The Express response object used to send the stock data.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const findSingleStock: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const stock = await stocksService.findStockById(Number(id));

	return res.status(StatusCodes.OK).json(stock);
};

/**
 * Creates a new stock by inserting it into the database.
 *
 * @param {object} body - The request body containing the new stock data.
 * @param {Response} res - The Express response object used to send the newly created stock data.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const createStock: RequestHandler = async ({ body }, res) => {
	const createdStock = await stocksService.insertStock(body);

	return res.status(StatusCodes.CREATED).json(createdStock);
};

/**
 * Updates a stock by its ID.
 *
 * @param {Request} req - The Express request object containing the stock ID as a path parameter and the updated stock data in the request body.
 * @param {Response} res - The Express response object used to send the response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const updateStock: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const stockData = req.body;

	await stocksService.updateStock(Number(id), stockData);

	return res.status(StatusCodes.CREATED).send();
};

/**
 * Deletes a stock by its ID.
 *
 * @param {Request} req - The Express request object containing the stock ID as a path parameter.
 * @param {Response} res - The Express response object used to send the response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
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
