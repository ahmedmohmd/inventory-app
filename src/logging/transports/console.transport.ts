import { format, transports } from "winston";
import chalk from "chalk";

const { combine, timestamp, printf, errors, splat } = format;

const levels = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	verbose: "cyan",
	debug: "blue",
	silly: "gray",
};

const PAD_END = 7;
const IDENTATION_LEVEL = 2;

const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
	const levelUpper = level.toUpperCase();
	const coloredLevel = chalk[levels[level]](levelUpper.padEnd(PAD_END));

	let msg = `${chalk.gray(timestamp)} ${coloredLevel}: ${message}`;

	if (metadata.stack) {
		msg += `\n${chalk.red(metadata.stack)}`;
	}

	if (Object.keys(metadata).length > 0 && !metadata.stack) {
		msg += `\n${chalk.cyan("metadata:")} ${JSON.stringify(metadata, null, IDENTATION_LEVEL)}`;
	}

	return msg;
});

const consoleTransport = new transports.Console({
	format: combine(
		timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
		errors({ stack: true }),
		splat(),
		customFormat
	),
	level: "debug",
});

export { consoleTransport };
