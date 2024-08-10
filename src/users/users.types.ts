type CreateUser = {
	name: string;
	email: string;
	password: string;
};

type UpdateUser = Partial<CreateUser>;

export { CreateUser, UpdateUser };
