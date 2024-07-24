import React, { useContext, useState } from "react";
import "./AddCoin.css";
import closeIcon from "../../assets/icons/close-icon.svg";
import Button from "../Button/Button";
import { CoinContext } from "../../context/CoinContext";

const AddCoin = ({ onAddCoin, onClose }) => {
	const { allCoins, currency, convertUsdToEur, convertEurToUsd } =
		useContext(CoinContext);
	const [coin, setCoin] = useState({
		id: "",
		name: "",
		quantity: 0,
		price: 0,
		total: 0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCoin((prevCoin) => {
			let updatedCoin = { ...prevCoin, [name]: value };

			if (name === "id") {
				const currentCoin = allCoins.find((coin) => coin.id === value);

				updatedCoin = {
					...updatedCoin,
					name: currentCoin.name,
					price: currentCoin.current_price,
				};
			}

			updatedCoin.quantity = parseFloat(updatedCoin.quantity) || 0;
			updatedCoin.price = parseFloat(updatedCoin.price) || 0;
			const total = updatedCoin.quantity * updatedCoin.price;

			updatedCoin = { ...updatedCoin, total };
			return updatedCoin;
		});
	};

	const handleWrapperClick = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	const addCoinHandler = () => {
		if (coin.quantity <= 0 || coin.id === "") return;

		const { price, total, ...updatedCoin } = coin;
		updatedCoin.price = { usd: 0, eur: 0 };
		updatedCoin.total = { usd: 0, eur: 0 };
		updatedCoin.price[currency.name] = price;
		updatedCoin.total[currency.name] = total;

		if (currency.name === "usd") {
			updatedCoin.price.eur = convertUsdToEur(updatedCoin.price.usd);
			updatedCoin.total.eur = convertUsdToEur(updatedCoin.total.usd);
		} else if (currency.name === "eur") {
			updatedCoin.price.usd = convertEurToUsd(updatedCoin.price.eur);
			updatedCoin.total.usd = convertEurToUsd(updatedCoin.total.eur);
		}

		onAddCoin(updatedCoin);
	};

	return (
		<div className="add-coin-overlay" onClick={handleWrapperClick}>
			<div className="add-coin-wrapper">
				<div className="modal-header">
					<h5>Add Transaction</h5>
					<img src={closeIcon} alt="close" onClick={onClose} />
				</div>

				<select
					name="id"
					className="select-coin"
					value={coin.id}
					onChange={handleChange}
				>
					<option value="" disabled>
						Select a coin...
					</option>
					{allCoins.map((coin) => (
						<option value={coin.id} key={coin.id}>
							{coin.name}
						</option>
					))}
				</select>

				<div className="inputs-container">
					<div className="input-wrapper">
						<label htmlFor="quantity">Quantity:</label>
						<input
							type="number"
							min="0"
							name="quantity"
							id="quantity"
							className="form-input"
							autoComplete="quantity"
							placeholder="0.00"
							value={coin.quantity}
							onChange={handleChange}
						/>
					</div>

					<div className="input-wrapper">
						<label htmlFor="price">Price Per Coin:</label>
						<input
							type="number"
							min="0"
							name="price"
							id="price"
							className="form-input"
							autoComplete="price"
							placeholder="Price Per Coin..."
							value={coin.price}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="total-wrapper">
					<label>Total Spent:</label>
					<p id="total-spent">
						{currency.symbol}
						{coin.total}
					</p>
				</div>
				<Button text={"add coin"} onClick={addCoinHandler} />
			</div>
		</div>
	);
};

export default AddCoin;
