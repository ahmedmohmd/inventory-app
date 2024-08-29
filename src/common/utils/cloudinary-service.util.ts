import { DeleteApiResponse, UploadApiResponse } from "cloudinary";
import { cloudinary } from "./cloudinary.util";

const uploadImage = async (
	file: Express.Multer.File,
	folder: string
): Promise<UploadApiResponse | undefined> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{ resource_type: "image", folder: folder },
				(error, result) => {
					if (error) {
						return reject(error);
					}
					return resolve(result);
				}
			)
			.end(file.buffer);
	});
};

const removeImage = async (publicId: string): Promise<DeleteApiResponse> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(
			publicId,
			{ resource_type: "image" },
			(error, result) => {
				if (error) {
					return reject(error);
				}

				return resolve(result);
			}
		);
	});
};

export { removeImage, uploadImage };
