import { SectionName } from "./sections.enum";

export type CreateSection = {
	name: SectionName;
	description?: string;
};

export type UpdateSection = Partial<Pick<CreateSection, "description">>;
