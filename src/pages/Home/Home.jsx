import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import heroLeft from "../../assets/images/hero-left.svg";
import heroRight from "../../assets/images/hero-right.svg";
import homePortfolio from "../../assets/images/home-portfolio.svg";
import homeExplore from "../../assets/images/home-explore.svg";

import { CoinContext } from "../../context/CoinContext";
import CoinTableRow from "../../components/CoinTableRow";
import CryptoTable from "../../components/CryptoTable";
import Button from "../../components/Button/Button";

const Home = () => {
	const { allCoins } = useContext(CoinContext);

	return (
		<div className="home">
			<section className="hero">
				<img src={heroLeft} alt="hero-left" className="img-left" />

				<article className="hero-text">
					<p className="subheading">real-time tracking</p>
					<h1>Your #1 Trusted Source for Everything Crypto</h1>

					<p className="description">
						Stay ahead of the curve with our comprehensive platform.
						Get real-time price updates, in-depth market data, and
						all the latest information on a wide variety of
						cryptocurrencies.
					</p>

					<div className="btn-container">
						<Link to={"/register"}>
							<Button text="Get Started" />
						</Link>
						<Link to={"/explore"}>
							<Button text="Explore" isGhost={true} />
						</Link>
					</div>
				</article>

				<img src={heroRight} alt="hero-right" className="img-right" />
			</section>

			<section className="home-rankings">
				<p className="subheading">global rankings</p>
				<h2>Top Cryptocurrencies By Market Cap</h2>

				<CryptoTable
					columns={[
						"#",
						"Coins",
						"Price",
						"24H Change",
						"Market Cap",
					]}
				>
					{allCoins.slice(0, 3).map((item, index) => (
						<CoinTableRow item={item} key={index} />
					))}
				</CryptoTable>

				<Link to={"/rankings"} className="home-btn-rankings">
					<Button text="Check Rankings" />
				</Link>
			</section>

			<section className="home-portfolio">
				<div className="home-portfolio-text">
					<p className="subheading">global rankings</p>
					<h2>Build Your Portfolio & Monitor Performance</h2>
					<p>
						Easily create your personalized crypto portfolio and
						stay updated on its performance. Our intuitive platform
						allows you to track price changes, monitor market
						trends, and manage your investments all in one place.
					</p>

					<Link to={"/hub"} className="home-btn-portfolio">
						<Button text="Portfolio Hub" />
					</Link>
				</div>

				<img src={homePortfolio} alt="portfolio" />
			</section>

			<section className="home-explore">
				<img src={homeExplore} alt="portfolio" />

				<div className="home-explore-text">
					<p className="subheading">monitor markets</p>
					<h2>Discover Crypto Sectors & Market Trends</h2>
					<p>
						Easily create your personalized crypto portfolio and
						stay updated on its performance. Our intuitive platform
						allows you to track price changes, monitor market
						trends, and manage your investments all in one place.
					</p>

					<Link to={"/explore"} className="home-btn-explore">
						<Button text="Explore" />
					</Link>
				</div>
			</section>

			<section className="home-cta">
				<div className="cta-text">
					<h2>Elevate Your Crypto Journey with Our Tools</h2>
					<p>
						Receive real-time updates, create and manage your
						personalized cryptocurrency portfolio, compare its
						performance with others, and stay ahead of market
						trends. Our platform empowers you with comprehensive
						tools to make informed investment decisions and navigate
						the dynamic crypto landscape with confidence.
					</p>
				</div>
				<Link to={"/register"}>
					<Button text="Join Our Platform Now"></Button>
				</Link>
			</section>
		</div>
	);
};

export default Home;
