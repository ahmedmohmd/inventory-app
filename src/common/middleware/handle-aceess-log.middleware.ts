import geoip from "geoip-lite";

import { Request, Response, NextFunction } from "express";
import logger from "../../logging";

import UAParser from "ua-parser-js";

interface UserAgentInfo {
	browser: {
		name?: string;
		version?: string;
	};
	engine: {
		name?: string;
		version?: string;
	};
	os: {
		name?: string;
		version?: string;
	};
	device: {
		vendor?: string;
		model?: string;
		type?: string;
	};
	cpu: {
		architecture?: string;
	};
}

interface LogData {
	timestamp: string;
	userAgent: UserAgentInfo;
	ipAddress: string;
	userLocation: {
		country: string;
		region: string;
		city: string;
	} | null;
	requestMethod: string;
	url: string;
	statusCode: number;
}

const loggingMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const parser = new UAParser(req.headers["user-agent"]);
	const userAgentInfo = parser.getResult();

	const ipAddress = (req.ip || req.socket.remoteAddress) as string;
	const userLocation = geoip.lookup(ipAddress);
	const requestMethod = req.method;
	const timestamp = new Date().toISOString();
	const url = req.originalUrl;

	const logData: LogData = {
		timestamp,
		userAgent: {
			browser: {
				name: userAgentInfo.browser.name,
				version: userAgentInfo.browser.version,
			},
			engine: {
				name: userAgentInfo.engine.name,
				version: userAgentInfo.engine.version,
			},
			os: {
				name: userAgentInfo.os.name,
				version: userAgentInfo.os.version,
			},
			device: {
				vendor: userAgentInfo.device.vendor,
				model: userAgentInfo.device.model,
				type: userAgentInfo.device.type,
			},
			cpu: {
				architecture: userAgentInfo.cpu.architecture,
			},
		},
		ipAddress,
		userLocation: userLocation
			? {
					country: userLocation.country,
					region: userLocation.region,
					city: userLocation.city,
				}
			: null,
		requestMethod,
		url,
		statusCode: res.statusCode,
	};

	logger.access.info(logData);

	next();
};

export default loggingMiddleware;
