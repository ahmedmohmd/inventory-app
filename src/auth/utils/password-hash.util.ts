import bcrypt from "bcrypt";

const HASH_SALT = 10;

/**
 * Hashes a given password using bcrypt.
 *
 * @param {string} password - the password to be hashed
 * @return {Promise<string>} a promise that resolves with the hashed password
 */
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

/**
 * Checks if a plain text password matches a hashed password using bcrypt.
 *
 * @param {string} plainTextPassword - The plain text password to check.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @return {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
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
