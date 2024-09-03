import { CategoryName } from "./categories.enum";

export type CreateCategory = {
	name: CategoryName;
	description?: string;
};

export type UpdateCategory = Partial<Pick<CreateCategory, "description">>;
