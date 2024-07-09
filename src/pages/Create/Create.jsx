import React, { useContext, useEffect, useState } from "react";
import "./Create.css";
import plusIcon from "../../assets/icons/plus-icon.svg";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { CoinContext } from "../../context/CoinContext";
import Button from "../../components/Button/Button";
import PieChart from "../../components/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow";
import AddCoin from "../../components/AddCoin/AddCoin";
import { calculateAveragePrice } from "../../utils/helpers";

const Create = () => {
	const { allCoins } = useContext(CoinContext);
	const [inputTitle, setInputTitle] = useState("");
	const [inputCoins, setInputCoins] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

	const closeModalHandler = (e) => {
		setIsModalOpen(false);
	};

	const openModalHandler = (e) => {
		setIsModalOpen(true);
	};

	const addCoinHandler = (coin) => {
		setIsModalOpen(false);

		const existingCoin = inputCoins.find((c) => c.id === coin.id);

		if (existingCoin) {
			const updatedCoins = inputCoins.map((c) => {
				if (c.id !== coin.id) return c;

				return {
					...c,
					quantity: c.quantity + coin.quantity,
					total: c.total + coin.total,
					price: calculateAveragePrice(
						c.price,
						c.quantity,
						coin.price,
						coin.quantity
					),
				};
			});
			return setInputCoins(updatedCoins);
		}

		setInputCoins((prevCoins) => [...prevCoins, coin]);
	};

	const removeCoinHandler = (coinToRemove) => {
		const updatedInputCoins = inputCoins.filter(
			(coin) => coin.id !== coinToRemove.id
		);

		setInputCoins(updatedInputCoins);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSubmitButtonDisabled) return;
		console.log("title", inputTitle);
		console.log("coins", inputCoins);
	};

	const handleTitleChange = (e) => {
		const value = e.target.value;
		setInputTitle(value);
	};

	useEffect(() => {
		if (inputTitle !== "" && inputCoins.length > 0)
			return setIsSubmitButtonDisabled(false);
		setIsSubmitButtonDisabled(true);
	}, [inputTitle, inputCoins]);

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
						value={inputTitle}
						onChange={handleTitleChange}
					/>
				</div>

				<div className="create-chart">
					<PieChart data={inputCoins} />
				</div>

				<h3 className="assets-title">Assets</h3>

				<Button
					text={"add coin"}
					isGhost={true}
					onClick={openModalHandler}
				/>

				<CryptoTable
					columns={[
						"#",
						"Coins",
						"Price",
						"24H Change",
						"Market Cap",
					]}
				>
					{inputCoins.length > 0 &&
						inputCoins.map((coin) => (
							<div className="create-row-wrapper" key={coin.id}>
								<CoinTableRow coin={coin} />
								<img
									src={minusIcon}
									alt="remove"
									className="remove-coin-img"
									onClick={() => removeCoinHandler(coin)}
								/>
							</div>
						))}
				</CryptoTable>

				<Button
					type={"submit"}
					text={"publish portfolio"}
					isDisabled={isSubmitButtonDisabled}
				/>

				{isModalOpen && (
					<AddCoin
						allCoins={allCoins}
						onAddCoin={addCoinHandler}
						onClose={closeModalHandler}
					/>
				)}
			</form>
		</section>
	);
};

export default Create;
