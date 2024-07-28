import "./Create.css";
import plusIcon from "../../assets/icons/plus-icon.svg";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { useCoinContext } from "../../context/CoinContext";
import Button from "../../components/Button/Button";
import PieChart from "../../components/PieChart/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import AddCoin from "../../components/AddCoin/AddCoin";
import { formatPrice } from "../../utils/helpers";
import usePortfolioForm from "../../hooks/usePortfolioForm";
import { postPortfolio } from "../../api/firebase-db";

const initialPortfolio = {
	title: "",
	owner: {
		uid: "",
		displayName: "",
	},
	totalAllocation: {
		usd: 0,
		eur: 0,
	},
	allocations: [],
	followers: [],
};

const Create = () => {
	const { currency } = useCoinContext();
	const {
		portfolio,
		matchingCoins,
		isSubmitButtonDisabled,
		isAddCoinOpen,
		titleChangeHandler,
		closeAddCoinHandler,
		openAddCoinHandler,
		addCoinHandler,
		removeCoinHandler,
		submitHandler,
	} = usePortfolioForm(initialPortfolio, postPortfolio, currency);

	return (
		<section className="create">
			<h2 className="page-header">
				<img src={plusIcon} alt="create" />
				Create
			</h2>

			<form onSubmit={submitHandler}>
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
						onChange={titleChangeHandler}
					/>
				</div>

				<div className="create-chart">
					<PieChart
						data={portfolio.allocations}
						currency={currency}
					/>
				</div>

				<div className="allocation">
					<p className="label">Total Allocation</p>
					<h3>
						{currency.symbol}
						{currency.name === "usd"
							? formatPrice(portfolio.totalAllocation.usd)
							: formatPrice(portfolio.totalAllocation.eur)}
					</h3>
				</div>

				<h3 className="assets-title">Allocations</h3>

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
									onClick={() => removeCoinHandler(coin)}
								/>
							</div>
						))}
				</CryptoTable>

				<Button
					type={isSubmitButtonDisabled ? "button" : "submit"}
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
		</section>
	);
};

export default Create;
