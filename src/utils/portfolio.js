import {
	calculateAveragePrice,
	calculateCurrentBalance,
	calculatePriceChangePercentage,
	findTopPerformers,
} from "./helpers";

export const addCoinToPortfolio = (portfolio, coinToAdd) => {
	const existingCoin = portfolio.allocations.some(
		(c) => c.id === coinToAdd.id
	);

	if (!existingCoin) {
		return {
			...portfolio,
			allocations: [...portfolio.allocations, coinToAdd],
			totalAllocation: {
				usd: portfolio.totalAllocation.usd + coinToAdd.total.usd,
				eur: portfolio.totalAllocation.eur + coinToAdd.total.eur,
			},
		};
	}

	const updatedCoins = portfolio.allocations.map((inputCoin) => {
		if (inputCoin.id !== coinToAdd.id) return inputCoin;

		return {
			...inputCoin,
			quantity: inputCoin.quantity + coinToAdd.quantity,
			total: {
				usd: inputCoin.total.usd + coinToAdd.total.usd,
				eur: inputCoin.total.eur + coinToAdd.total.eur,
			},
			price: {
				usd: calculateAveragePrice(
					inputCoin.price.usd,
					inputCoin.quantity,
					coinToAdd.price.usd,
					coinToAdd.quantity
				),
				eur: calculateAveragePrice(
					inputCoin.price.eur,
					inputCoin.quantity,
					coinToAdd.price.eur,
					coinToAdd.quantity
				),
			},
		};
	});

	return {
		...portfolio,
		allocations: updatedCoins,
		totalAllocation: {
			usd: portfolio.totalAllocation.usd + coinToAdd.total.usd,
			eur: portfolio.totalAllocation.eur + coinToAdd.total.eur,
		},
	};
};

export const removeCoinFromPortfolio = (portfolio, coinToRemove) => {
	const updatedAllocations = portfolio.allocations.filter(
		(inputCoin) => inputCoin.id !== coinToRemove.id
	);

	const totalAllocation = {
		usd: portfolio.totalAllocation.usd - coinToRemove.total.usd,
		eur: portfolio.totalAllocation.eur - coinToRemove.total.eur,
	};

	if (totalAllocation.usd <= 0.01) totalAllocation.usd = 0;
	if (totalAllocation.eur <= 0.01) totalAllocation.eur = 0;

	return {
		...portfolio,
		allocations: updatedAllocations,
		totalAllocation,
	};
};

export const updatePortfolioMetrics = (portfolio, matchingCoins, currency) => {
	const currentBalance = calculateCurrentBalance(matchingCoins);

	return {
		...portfolio,
		currentBalance,
		isPositivePriceChange:
			currentBalance >= portfolio.totalAllocation[currency.name],
		alltimeProfitLoss:
			currentBalance - portfolio.totalAllocation[currency.name],
		alltimeProfitLossPercentage: calculatePriceChangePercentage(
			portfolio.totalAllocation[currency.name],
			currentBalance
		),
		topPerformers: findTopPerformers(matchingCoins, currency),
	};
};
