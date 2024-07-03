import React from "react";
import "./Home.css";
import heroLeft from "../../assets/images/hero-left.svg";
import heroRight from "../../assets/images/hero-right.svg";
import Button from "../../components/Button/Button";

const Home = () => {
	return (
		<div className="home">
			<section className="hero">
				<img src={heroLeft} alt="hero-left" />
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
						<Button text="Get Started" />
						<Button text="Explore" isGhost={true} />
					</div>
				</article>
				<img src={heroRight} alt="hero-right" />
			</section>
		</div>
	);
};

export default Home;
