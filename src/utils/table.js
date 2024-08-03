export const sortTable = (coins, filter, isAscendingOrder) => {
	let filteredCoins = [];

	switch (filter) {
		case "_coins":
			filteredCoins = isAscendingOrder
				? coins.sort((a, b) => a.name.localeCompare(b.name))
				: coins.sort((a, b) => b.name.localeCompare(a.name));
			break;

		case "_price":
			filteredCoins = isAscendingOrder
				? coins.sort((a, b) => b.current_price - a.current_price)
				: coins.sort((a, b) => a.current_price - b.current_price);
			break;

		case "_7d-change":
			filteredCoins = isAscendingOrder
				? coins.sort(
						(a, b) =>
							b.price_change_percentage_7d_in_currency -
							a.price_change_percentage_7d_in_currency
				  )
				: coins.sort(
						(a, b) =>
							a.price_change_percentage_7d_in_currency -
							b.price_change_percentage_7d_in_currency
				  );
			break;

		case "_24h-change":
			filteredCoins = isAscendingOrder
				? coins.sort(
						(a, b) =>
							b.price_change_percentage_24h -
							a.price_change_percentage_24h
				  )
				: coins.sort(
						(a, b) =>
							a.price_change_percentage_24h -
							b.price_change_percentage_24h
				  );
			break;

		case "_market-cap":
			filteredCoins = isAscendingOrder
				? coins.sort((a, b) => b.market_cap - a.market_cap)
				: coins.sort((a, b) => a.market_cap - b.market_cap);
			break;

		default:
			filteredCoins = coins.sort((a, b) => b.market_cap - a.market_cap);
			break;
	}

	return filteredCoins;
};
