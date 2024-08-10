import bcrypt from "bcrypt";

const HASH_SALT = 10;

const hashPassword = (password: string) => {
	if (!password) {
		return "";
	}

	return bcrypt.hashSync(password, HASH_SALT);
};

const checkPassword = (plainTextPassword: string, hashedPassword: string) => {
	if (!hashPassword || plainTextPassword) {
		return false;
	}

	return bcrypt.compareSync(plainTextPassword, hashedPassword);
};

export { checkPassword, hashPassword };
