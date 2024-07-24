import React, { useContext, useState, useEffect } from "react";
import "./Create.css";
import plusIcon from "../../assets/icons/plus-icon.svg";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { CoinContext } from "../../context/CoinContext";
import Button from "../../components/Button/Button";
import PieChart from "../../components/PieChart/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import AddCoin from "../../components/AddCoin/AddCoin";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { formatPrice } from "../../utils/helpers";
import {
	addCoinToPortfolio,
	removeCoinFromPortfolio,
} from "../../utils/portfolio";
import useMatchingCoins from "../../hooks/useMatchingCoins";

const Create = () => {
	const { currency } = useContext(CoinContext);
	const [portfolio, setPortfolio] = useState({
		title: "",
		owner: "username",
		totalAllocation: {
			usd: 0,
			eur: 0,
		},
		allocations: [],
	});
	const { matchingCoins } = useMatchingCoins(portfolio.allocations);
	const [coinToRemove, setCoinToRemove] = useState({});

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);
	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

	const closeAddCoinHandler = (e) => setIsAddCoinOpen(false);
	const openAddCoinHandler = (e) => setIsAddCoinOpen(true);

	const closeConfirmModalHandler = (e) => setIsConfirmModalOpen(false);
	const openConfirmModalHandler = (coin) => {
		setCoinToRemove(coin);
		setIsConfirmModalOpen(true);
	};

	const addCoinHandler = (coinToAdd) => {
		setIsAddCoinOpen(false);
		setPortfolio((prevPortfolio) =>
			addCoinToPortfolio(prevPortfolio, coinToAdd)
		);
	};

	const removeCoinHandler = () => {
		setIsConfirmModalOpen(false);

		setPortfolio((prevPortfolio) =>
			removeCoinFromPortfolio(prevPortfolio, coinToRemove)
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSubmitButtonDisabled) return;
		console.log("title", portfolio.title);
		console.log("coins", portfolio.allocations);
	};

	const handleTitleChange = (e) =>
		setPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			title: e.target.value,
		}));

	useEffect(() => {
		portfolio.title !== "" && portfolio.allocations.length > 0
			? setIsSubmitButtonDisabled(false)
			: setIsSubmitButtonDisabled(true);
	}, [portfolio]);

	return (
		<section className="create">
			<h2 className="page-header">
				<img src={plusIcon} alt="create" />
				Create
			</h2>

			<form onSubmit={handleSubmit}>
				<div className="title-wrapper">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						name="title"
						id="title"
						className="form-input"
						autoComplete="title"
						placeholder="Your portfolio title..."
						value={portfolio.title}
						onChange={handleTitleChange}
					/>
				</div>

				<div className="create-chart">
					<PieChart
						data={portfolio.allocations}
						currency={currency}
					/>
				</div>

				<div className="allocation">
					<label>Total Allocation</label>
					<h3>
						{currency.symbol}
						{currency.name === "usd"
							? formatPrice(portfolio.totalAllocation.usd)
							: formatPrice(portfolio.totalAllocation.eur)}
					</h3>
				</div>

				<h3 className="assets-title">Assets</h3>

				<Button
					text={"add coin"}
					isGhost={true}
					onClick={openAddCoinHandler}
				/>

				<CryptoTable
					columns={["#", "Coins", "Price", "Change", "Allocation"]}
				>
					{portfolio.allocations.length > 0 &&
						matchingCoins.map((coin) => (
							<div className="create-row-wrapper" key={coin.id}>
								<CoinTableRow
									allocation={coin}
									coin={coin.market_data}
								/>
								<img
									src={minusIcon}
									alt="remove"
									className="remove-coin-img"
									onClick={() =>
										openConfirmModalHandler(coin)
									}
								/>
							</div>
						))}
				</CryptoTable>

				<Button
					type={"submit"}
					text={"publish portfolio"}
					isDisabled={isSubmitButtonDisabled}
				/>
			</form>

			{isAddCoinOpen && (
				<AddCoin
					onAddCoin={addCoinHandler}
					onClose={closeAddCoinHandler}
				/>
			)}

			{isConfirmModalOpen && (
				<ConfirmModal
					onClose={closeConfirmModalHandler}
					onConfirm={removeCoinHandler}
					message={"Are you sure you want to remove this allocation?"}
				/>
			)}
		</section>
	);
};

export default Create;
