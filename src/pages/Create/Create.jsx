import React, { useState } from "react";
import "./Create.css";
import plusIcon from "../../assets/icons/plus-icon.svg";
import Button from "../../components/Button/Button";
import PieChart from "../../components/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow";
import AddTransaction from "../../components/AddTransaction/AddTransaction";

const Create = () => {
	const [inputs, setInputs] = useState({});
	const [allocations, setAllocations] = useState([
		["Crypto", "Allocation"],
		["none", 1],
	]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModalHandler = (e) => {
		setIsModalOpen(false);
	};

	const openModalHandler = (e) => {
		setIsModalOpen(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
	};

	const handleChange = (e) => {
		console.log(e);
	};

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
						type="title"
						name="title"
						id="title"
						className="form-input"
						autoComplete="title"
						placeholder="Your portfolio title..."
						value={inputs.title || ""}
						onChange={handleChange}
					/>
				</div>

				<div className="create-chart">
					<PieChart data={allocations} />
				</div>

				<h3 className="assets-title">Assets</h3>

				<CryptoTable
					columns={["#", "Coins", "Price", "24H Change", "Action"]}
				></CryptoTable>

				<Button
					text={"add coin"}
					isGhost={true}
					onClick={openModalHandler}
				/>

				{isModalOpen && <AddTransaction onClose={closeModalHandler} />}
			</form>
		</section>
	);
};

export default Create;
