import "./Portfolio.css";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { useCoinContext } from "../../context/CoinContext";
import PieChart from "../../components/PieChart/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import Button from "../../components/Button/Button";
import AddCoin from "../../components/AddCoin/AddCoin";
import Loader from "../../components/Loader/Loader";
import PortfolioDetails from "./PortfolioDetails/PortfolioDetails";
import useGetPorfolioById from "../../hooks/useGetPortfolioById";
import usePortfolioForm from "../../hooks/usePortfolioForm";
import { updatePortfolio } from "../../api/firebase-db";

const Portfolio = () => {
	const { currency } = useCoinContext();
	const { initialPortfolio, isLoading } = useGetPorfolioById();
	const {
		portfolio,
		matchingCoins,
		isEditMode,
		isAddCoinOpen,
		isSubmitButtonDisabled,
		toggleEditModeHandler,
		titleChangeHandler,
		closeAddCoinHandler,
		openAddCoinHandler,
		addCoinHandler,
		removeCoinHandler,
		submitHandler,
		setFollowers,
	} = usePortfolioForm(initialPortfolio, updatePortfolio, currency);

	if (isLoading)
		return (
			<section className="portfolio">
				<div className="loading">
					<Loader size="10rem" />
				</div>
			</section>
		);

	return (
		<section className="portfolio">
			<PortfolioDetails
				isEditMode={isEditMode}
				portfolio={portfolio}
				onTitleChange={titleChangeHandler}
				onEditModeToggle={toggleEditModeHandler}
				onSave={submitHandler}
				isSaveButtonDisabled={isSubmitButtonDisabled}
				setFollowers={setFollowers}
			/>

			<div className="portfolio-assets">
				<div className="portfolio-chart">
					<PieChart
						allocations={portfolio.allocations}
						currency={currency}
					/>
				</div>

				<h3 className="assets-title">Allocations</h3>

				{isEditMode && (
					<Button
						text={"add coin"}
						isGhost={true}
						onClick={openAddCoinHandler}
					/>
				)}

				<CryptoTable
					className="portfolio-table"
					columns={[
						"#",
						"Coins",
						"Price",
						"Coin Profit/Loss",
						"Allocation",
					]}
					type={"portfolio-coin"}
				>
					{matchingCoins.map((coin) =>
						isEditMode ? (
							<div
								className="portfolio-row-wrapper"
								key={coin.id}
							>
								<CoinTableRow
									coin={coin.market_data}
									allocation={coin}
								/>
								<img
									src={minusIcon}
									alt="remove"
									className="remove-coin-img"
									onClick={() => removeCoinHandler(coin)}
								/>
							</div>
						) : (
							<CoinTableRow
								coin={coin.market_data}
								allocation={coin}
								key={coin.id}
							/>
						)
					)}
				</CryptoTable>
			</div>

			{isAddCoinOpen && (
				<AddCoin
					onAddCoin={addCoinHandler}
					onClose={closeAddCoinHandler}
				/>
			)}
		</section>
	);
};

export default Portfolio;
