import { Link } from "react-router-dom";

import "./PortfolioHub.css";
import hubIcon from "../../assets/icons/portfolio-icon-white.svg";

import useGetPorfolios from "../../hooks/useGetPortfolios";
import CryptoTable from "../../components/common/CryptoTable/CryptoTable";
import PortfolioTableRow from "../../components/common/CryptoTable/PortfolioTableRow/PortfolioTableRow";
import Button from "../../components/common/Button/Button";
import CategoriesMenu from "../../components/common/CategoriesMenu/CategoriesMenu";
import InfiniteScroll from "../../components/common/InfiniteScroll/InfiniteScroll";
import { portfolioCategories } from "../../constants/categories";

const PortfolioHub = () => {
	const defaultCategory = "newest";

	const {
		portfolios,
		category,
		isLoading,
		hasNoPortfolios,
		hasToLogin,
		hasNoFollowing,
		hasNoOwned,
		isLastPage,
		changeCategory,
		changePage,
	} = useGetPorfolios(defaultCategory);

	const noResultsMessage = hasToLogin
		? "Please login to view this category."
		: hasNoFollowing
		? "You haven't followed any portfolios yet."
		: hasNoOwned
		? "You don't have any created portfolios yet."
		: hasNoPortfolios
		? "No portfolios yet, be the first!"
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
					<Button text="create portfolio*"></Button>
					<p className="disclaimer">
						*Limited to current top 250 coins
					</p>
				</Link>
			</div>

			<CategoriesMenu
				categories={portfolioCategories}
				selectedCategory={category}
				defaultCategory={defaultCategory}
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
					type={"portfolio"}
				>
					{isLoading === false && noResultsMessage !== "" ? (
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
					<InfiniteScroll
						isLoading={isLoading}
						isLastPage={isLastPage}
						changePage={changePage}
					/>
				</CryptoTable>
			</div>
		</section>
	);
};

export default PortfolioHub;
