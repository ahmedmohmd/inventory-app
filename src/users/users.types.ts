import { Role } from "../common/enums/user-role.enum";

type CreateUser = {
	name: string;
	email: string;
	password: string;
	role: Role;
};

type UpdateUser = Partial<CreateUser> & {
	resetPasswordToken?: string;
};

type FindAllUsersQuery = {
	role: Role;
	active: boolean;
};

export { CreateUser, UpdateUser, FindAllUsersQuery };
