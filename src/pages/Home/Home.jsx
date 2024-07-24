import React, { useContext } from "react";
import "./Home.css";

import { CoinContext } from "../../context/CoinContext";
import HeroSection from "./HeroSection/HeroSection";
import RankingsSection from "./RankingsSection/RankingsSection";
import PortfolioSection from "./PortfolioSection/PortfolioSection";
import ExploreSection from "./ExploreSection/ExploreSection";
import CtaSection from "./CtaSection/CtaSection";

const Home = () => {
	const { allCoins } = useContext(CoinContext);

	return (
		<div className="home">
			<HeroSection />

			<RankingsSection allCoins={allCoins} />

			<PortfolioSection />

			<ExploreSection />

			<CtaSection />
		</div>
	);
};

export default Home;
