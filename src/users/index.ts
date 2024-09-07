import usersRouter from "./users.router";
import usersService from "./users.service";
import usersValidationSchema from "./users.validation-schema";

export default {
	router: usersRouter,
	service: usersService,
	validationSchema: usersValidationSchema,
};
