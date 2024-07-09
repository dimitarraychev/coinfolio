import React, { useState } from "react";
import "./AddCoin.css";
import closeIcon from "../../assets/icons/close-icon.svg";
import Button from "../Button/Button";

const AddCoin = ({ allCoins, onAddCoin, onClose }) => {
	const [inputs, setInputs] = useState({
		coinId: "",
		quantity: 0,
		price: 0,
		total: 0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prevInputs) => {
			let newInputs = { ...prevInputs, [name]: value };

			const quantity = parseFloat(newInputs.quantity) || 0;
			const price = parseFloat(newInputs.price) || 0;
			const total = quantity * price;

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
					name="coinId"
					className="select-coin"
					value={inputs.coinId || ""}
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
							name="quantity"
							id="quantity"
							className="form-input"
							autoComplete="quantity"
							placeholder="0.00"
							value={inputs.quantity || ""}
							onChange={handleChange}
						/>
					</div>

					<div className="input-wrapper">
						<label htmlFor="price">Price Per Coin:</label>
						<input
							type="number"
							name="price"
							id="price"
							className="form-input"
							autoComplete="price"
							placeholder="Price Per Coin..."
							value={inputs.price || ""}
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
