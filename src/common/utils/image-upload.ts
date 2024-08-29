import * as cloudinaryService from "./cloudinary-service.util";

const uploadImage = async (
	file: Express.Multer.File | null,
	folder: string
) => {
	if (!file || !folder) {
		return null;
	}

	return await cloudinaryService.uploadImage(file, `inventory-app/${folder}`);
};

const removeImage = async (imageId: string | null) => {
	if (!imageId) {
		return null;
	}

	return await cloudinaryService.removeImage(imageId);
};

export { removeImage, uploadImage };
