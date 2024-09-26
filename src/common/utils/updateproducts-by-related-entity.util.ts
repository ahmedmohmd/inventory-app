import elasticSearch from "../../elastic-search";
import logger from "../../logging";

async function updateProductsByRelatedEntity(
	entityType,
	entityId,
	updatedData,
	stockId?: string,
	stockUpdate?: any // eslint-disable-line
) {
	try {
		const script = {
			source: `

			if(ctx._source.${entityType} == null) {
				            ctx._source.${entityType} = params.updatedData;

			} else {
				for (entry in params.updatedData.entrySet()) {
					ctx._source.${entityType}[entry.getKey()] = entry.getValue();
				}

			}
		  

		//   if (ctx._source.stocks == null) {
		// 	ctx._source.stocks = [];
		//   }
  
		//   for (stock in ctx._source.stocks) {
		// 	if (stock.id == params.stockUpdate.id) {
		// 	  for(entry in params.stockUpdate.entrySet()) {
		// 		stock[entry.getKey()] = entry.getValue();
		// 	  }

		// 	  break;
		// 	}
		//   }
  
		  ctx._source.lastModified = params.lastModified;
		`,
			params: {
				updatedData: updatedData,
				stockId: stockId,
				stockUpdate: stockUpdate,
				lastModified: new Date().toISOString(),
			},
		};

		const { updated } = await elasticSearch.client.updateByQuery({
			index: "products",
			body: {
				query: {
					term: {
						[`${entityType}.id`]: entityId,
					},
				},
				script: script,
			},
		});

		logger.info.info(
			`Updated ${updated} products for ${entityType} ${entityId}`
		);

		return updated;
	} catch (error) {
		logger.error.error(
			`Error updating products for ${entityType} ${entityId}:`,
			error
		);
		throw error;
	}
}

export { updateProductsByRelatedEntity };

// import elasticSearch from "../../elastic-search";
// import logger from "../../logging";

// async function updateProductsByRelatedEntity(
// 	entityType,
// 	entityId,
// 	updatedData
// ) {
// try {
// 	const script = {
// 		source: `
//       if (ctx._source.${entityType} == null) {
//         ctx._source.${entityType} = params.updatedData;
//       } else {
//         for (entry in params.updatedData.entrySet()) {
//           ctx._source.${entityType}[entry.getKey()] = entry.getValue();
//         }
//       }
//       ctx._source.lastModified = params.lastModified;
//     `,
// 		params: {
// 			updatedData: updatedData,
// 			lastModified: new Date().toISOString(),
// 		},
// 	};

// 	const { updated } = await elasticSearch.client.updateByQuery({
// 		index: "products",
// 		body: {
// 			query: {
// 				term: {
// 					[`${entityType}.id`]: entityId,
// 				},
// 			},
// 			script: script,
// 		},
// 	});

// 	logger.info.info(
// 		`Updated ${updated} products for ${entityType} ${entityId}`
// 	);

// 	return updated;
// } catch (error) {
// 	logger.error.error(
// 		`Error updating products for ${entityType} ${entityId}:`,
// 		error
// 	);
// 	throw error;
// }
// }

// export { updateProductsByRelatedEntity };
