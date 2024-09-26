import { Client } from "@elastic/elasticsearch";
import { ENV } from "../../config/env";

const client = new Client({
	node: ENV.ELASTIC_SEARCH_URL,
	auth: {
		apiKey: "OUc2TUU1SUIxbmhMZU4tYmpYVGs6eU9PRk5WeWxSeGFGSWQ3UkR4cUJXdw==",
	},
});

export default client;
