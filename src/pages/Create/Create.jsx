import "./Create.css";
import plusIcon from "../../assets/icons/plus-icon.svg";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { useCoinContext } from "../../context/CoinContext";
import usePortfolioForm from "../../hooks/usePortfolioForm";
import { postPortfolio } from "../../api/firebase/db";
import { formatPrice } from "../../utils/helpers";
import Button from "../../components/common/Button/Button";
import PieChart from "../../components/common/PieChart/PieChart";
import CryptoTable from "../../components/common/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/common/CryptoTable/CoinTableRow/CoinTableRow";
import AddCoin from "../../components/common/AddCoin/AddCoin";

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
	followersCount: 0,
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
						allocations={portfolio.allocations}
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
					columns={[
						"#",
						"Coins",
						"Price",
						"Coin Profit/Loss",
						"Allocation",
					]}
					type={"portfolio-coin"}
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
