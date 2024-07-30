import { Link } from "react-router-dom";

import "./PortfolioHub.css";
import hubIcon from "../../assets/icons/portfolio-icon-white.svg";

import PortfolioTableRow from "../../components/PortfolioTableRow/PortfolioTableRow";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";
import { portfolioCategories } from "../../constants/categories";
import useGetPorfolios from "../../hooks/useGetPortfolios";

const PortfolioHub = () => {
	const {
		portfolios,
		category,
		isLoading,
		hasNoPortfolios,
		hasToLogin,
		hasNoFollowing,
		hasNoOwned,
		changeCategory,
	} = useGetPorfolios();

	const noResultsMessage = hasNoFollowing
		? "You haven't followed any portfolios yet."
		: hasNoOwned
		? "You don't have any created portfolios yet."
		: hasNoPortfolios
		? "No portfolios yet, be the first!"
		: hasToLogin
		? "Please login to view this category."
		: "";

	return (
		<section className="hub">
			<h2 className="page-header">
				<img src={hubIcon} alt="hubIcon" />
				Portfolio Hub
			</h2>

			<div className="portfolio-cta-wrapper">
				<div className="cta-text">
					<h3>Join The Crypto Community</h3>
					<p>
						Manage and compare your portfolio's performance with the
						community.
					</p>
				</div>
				<Link to={"/hub/create"}>
					<Button text="create portfolio"></Button>
				</Link>
			</div>

			<CategoriesMenu
				categories={portfolioCategories}
				category={category}
				onCategoryChange={changeCategory}
			/>

			<div className="portfolios-wrapper">
				<CryptoTable
					columns={[
						"#",
						"Portfolios",
						"Allocation",
						"Profit/Loss",
						"Followers",
					]}
				>
					{isLoading ? (
						<div className="loading">
							<Loader />
						</div>
					) : noResultsMessage !== "" ? (
						<h6 className="no-portfolios">{noResultsMessage}</h6>
					) : (
						portfolios.map((portfolio, index) => (
							<PortfolioTableRow
								portfolio={portfolio}
								key={portfolio.id}
								index={index + 1}
							/>
						))
					)}
				</CryptoTable>
			</div>
		</section>
	);
};

export default PortfolioHub;
