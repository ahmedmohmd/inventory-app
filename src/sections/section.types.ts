export type CreateSection = {
	name: SectionName;
	description?: string;
};

export type SectionName =
	| "A1"
	| "B2"
	| "C3"
	| "D4"
	| "E5"
	| "F6"
	| "G7"
	| "H8"
	| "I9"
	| "J0";

export type UpdateSection = Partial<CreateSection>;
