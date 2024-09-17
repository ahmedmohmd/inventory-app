// import { beforeEach, describe, expect, it, vi } from "vitest";
// import { transporter } from "./mail.config";
// import { sendMail } from "./mail.service";
// import { MailOptions } from "./mail.type";

// vi.mock("./mail.config.ts", () => ({
// 	transporter: {
// 		sendMail: vi.fn(() => Promise.resolve({})),
// 	},
// }));

// describe("sendMail", () => {
// 	let fakeMailOptions: MailOptions;

// 	beforeEach(() => {
// 		fakeMailOptions = {
// 			from: "ahmed@example.com",
// 			to: "mohamed@example.com",
// 			subject: "subject",
// 		};
// 	});

// 	it("Should call transporter.sendMail() method.", async () => {
// 		const sendMailSpy = vi.spyOn(transporter, "sendMail");

// 		await sendMail(fakeMailOptions);

// 		expect(sendMailSpy).toHaveBeenCalledWith(fakeMailOptions);
// 	});

// 	it("Should return empty object", async () => {
// 		const actualResult = await sendMail(fakeMailOptions);

// 		expect(actualResult).toEqual({});
// 	});
// });
