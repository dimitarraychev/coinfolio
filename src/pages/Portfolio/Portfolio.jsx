import "./Portfolio.css";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { useCoinContext } from "../../context/CoinContext";
import useGetPorfolioById from "../../hooks/useGetPortfolioById";
import usePortfolioForm from "../../hooks/usePortfolioForm";
import { updatePortfolio } from "../../api/firebase-db";
import PieChart from "../../components/common/PieChart/PieChart";
import CryptoTable from "../../components/common/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/common/CryptoTable/CoinTableRow/CoinTableRow";
import Button from "../../components/common/Button/Button";
import AddCoin from "../../components/common/AddCoin/AddCoin";
import Loader from "../../components/common/Loader/Loader";
import PortfolioDetails from "./PortfolioDetails/PortfolioDetails";

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
					<Loader size="15rem" />
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
