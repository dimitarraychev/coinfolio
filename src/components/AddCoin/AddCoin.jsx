import React, { useState } from "react";
import "./AddCoin.css";
import closeIcon from "../../assets/icons/close-icon.svg";
import Button from "../Button/Button";

const AddCoin = ({ allCoins, onAddCoin, onClose }) => {
	const [inputs, setInputs] = useState({
		id: "",
		name: "",
		quantity: 0,
		price: 0,
		total: 0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prevInputs) => {
			let newInputs = { ...prevInputs, [name]: value };

			if (name === "id") {
				const currentCoin = allCoins.find((coin) => coin.id === value);

				newInputs = {
					...newInputs,
					name: currentCoin.name,
					price: currentCoin.current_price,
					market_cap_rank: currentCoin.market_cap_rank,
					image: currentCoin.image,
					symbol: currentCoin.symbol,
					current_price: currentCoin.current_price,
					price_change_percentage_24h:
						currentCoin.price_change_percentage_24h,
					market_cap: currentCoin.market_cap,
				};
			}

			newInputs.quantity = parseFloat(newInputs.quantity) || 0;
			newInputs.price = parseFloat(newInputs.price) || 0;
			const total = newInputs.quantity * newInputs.price;

			newInputs = { ...newInputs, total };
			return newInputs;
		});
	};

	const handleWrapperClick = (e) => {
		if (e.target === e.currentTarget) onClose();
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
					value={inputs.id}
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
							value={inputs.quantity}
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
							value={inputs.price}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="total-wrapper">
					<label htmlFor="total-spent">Total Spent:</label>
					<p id="total-spent">${inputs.total}</p>
				</div>
				<Button text={"add coin"} onClick={() => onAddCoin(inputs)} />
			</div>
		</div>
	);
};

export default AddCoin;
