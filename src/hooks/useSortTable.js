import { useState, useEffect } from "react";
import { sortTable } from "../utils/table";

const useSortTable = (coins, initialSort) => {
	const [sortedCoins, setSortedCoins] = useState([...coins]);
	const [selectedSortField, setSelectedSortField] = useState(initialSort);
	const [isAscendingOrder, setIsAscendingOrder] = useState(true);

	const tableSortHandler = (e) => {
		let sortField = e.target.className;
		if (e.target.className.includes("arrow-sort "))
			sortField = sortField.replace("arrow-sort ", "");

		if (sortField === selectedSortField) {
			setIsAscendingOrder((state) => !state);
		} else {
			setIsAscendingOrder(() => true);
		}

		setSelectedSortField(sortField);
	};

	useEffect(() => {
		const sorted = sortTable(
			[...coins],
			selectedSortField,
			isAscendingOrder
		);

		setSortedCoins(sorted);
	}, [isAscendingOrder, selectedSortField]);

	useEffect(() => {
		setSortedCoins(coins);
	}, [coins]);

	return {
		sortedCoins,
		selectedSortField,
		isAscendingOrder,
		tableSortHandler,
	};
};

export default useSortTable;
