import React, { useContext } from "react";
import "./AddTransaction.css";
import closeIcon from "../../assets/icons/close-icon.svg";
import { CoinContext } from "../../context/CoinContext";
import Button from "../Button/Button";

const AddTransaction = ({ onClose }) => {
	const { allCoins } = useContext(CoinContext);

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
				{/* 
				<ul className="actions-list">
					<li className="selected">Buy</li>
					<li>Sell</li>
					<li>Transfer</li>
				</ul> */}

				<select className="select-coin">
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
							// value={inputs.title || ""}
							// onChange={handleChange}
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
							// value={inputs.title || ""}
							// onChange={handleChange}
						/>
					</div>
				</div>

				<div className="total-wrapper">
					<label htmlFor="total-spent">Total Spent:</label>
					<p id="total-spent">0$</p>
				</div>
				<Button text={"add coin"} />
			</div>
		</div>
	);
};

export default AddTransaction;
