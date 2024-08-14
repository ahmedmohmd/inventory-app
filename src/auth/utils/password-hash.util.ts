import bcrypt from "bcrypt";

const HASH_SALT = 10;

const hashPassword = (password: string) => {
	if (!password) {
		return "";
	}

	return new Promise((resolve, reject) => {
		bcrypt.hash(password, HASH_SALT, (err, hash) => {
			if (err) {
				reject(err);
			}
			resolve(hash);
		});
	});
};

const checkPassword = (plainTextPassword: string, hashedPassword: string) => {
	if (!hashPassword || !plainTextPassword) {
		return false;
	}

	return new Promise((resolve, reject) => {
		bcrypt.compare(plainTextPassword, hashedPassword, (err, same) => {
			if (err) {
				reject(err);
			}
			resolve(same);
		});
	});
};

export { checkPassword, hashPassword };
