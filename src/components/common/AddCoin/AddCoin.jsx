import React, { useState, useEffect } from "react";

import "./AddCoin.css";
import closeIcon from "../../../assets/icons/close-icon.svg";

import { useCoinContext } from "../../../context/CoinContext";
import Button from "../Button/Button";
import { formatPrice } from "../../../utils/helpers";

const AddCoin = ({ onAddCoin, onClose }) => {
	const { allCoins, currency, convertCurrency } = useCoinContext();
	const [coin, setCoin] = useState({
		id: "",
		name: "",
		quantity: "",
		price: "",
		total: 0,
	});
	const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

	const changeHandler = (e) => {
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

			updatedCoin.quantity = parseFloat(updatedCoin.quantity);
			updatedCoin.price = parseFloat(updatedCoin.price);
			const total = updatedCoin.quantity * updatedCoin.price || 0;

			updatedCoin = { ...updatedCoin, total };
			return updatedCoin;
		});
	};

	const handleWrapperClick = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	const addCoinHandler = () => {
		const convertedCurrency = currency.name === "usd" ? "eur" : "usd";

		const { price, total, ...partialCoin } = coin;
		const updatedCoin = {
			...partialCoin,
			price: {
				[currency.name]: price,
				[convertedCurrency]: convertCurrency(price, currency.name),
			},
			total: {
				[currency.name]: total,
				[convertedCurrency]: convertCurrency(total, currency.name),
			},
		};

		onAddCoin(updatedCoin);
	};

	useEffect(() => {
		coin.quantity <= 0 || coin.id === ""
			? setIsAddButtonDisabled(true)
			: setIsAddButtonDisabled(false);
	}, [coin]);

	return (
		<div className="add-coin-overlay" onClick={handleWrapperClick}>
			<div className="add-coin-wrapper">
				<div className="modal-header">
					<h5>Add Coin</h5>
					<img src={closeIcon} alt="close" onClick={onClose} />
				</div>

				<select
					name="id"
					className="select-coin"
					value={coin.id}
					onChange={changeHandler}
				>
					<option value="" disabled>
						Select a coin...
					</option>
					{[...allCoins]
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((coin) => (
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
							onChange={changeHandler}
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
							placeholder="0.00"
							value={coin.price}
							onChange={changeHandler}
						/>
					</div>
				</div>

				<div className="total-wrapper">
					<p className="label">Total Spent:</p>
					<p id="total-spent">
						{currency.symbol}
						{formatPrice(coin.total)}
					</p>
				</div>
				<Button
					text={"add coin"}
					onClick={addCoinHandler}
					isDisabled={isAddButtonDisabled}
				/>
			</div>
		</div>
	);
};

export default AddCoin;
