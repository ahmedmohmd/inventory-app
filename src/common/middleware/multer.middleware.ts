import { Request } from "express";
import createHttpError from "http-errors";
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

// eslint-disable-next-line
const fileFilter: any = (req: Request, file: Express.Multer.File, cb: any) => {
	const allowedTypes = /png|jpg|jpeg/;
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = allowedTypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	}
	return cb(
		new createHttpError.BadRequest(
			"Only .png, .jpg, and .jpeg formats are allowed!"
		),
		false
	);
};

const NUMBER_IN_BYTE = 1024;
const NUMBER_IN_MB = 2;
const MAXIMUM_FILE_SIZE = NUMBER_IN_MB * NUMBER_IN_BYTE * NUMBER_IN_BYTE;

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: MAXIMUM_FILE_SIZE },
});

export { upload };
