import React from "react";
import { Link } from "react-router-dom";

import heroLeft from "../../../assets/images/hero-left.svg";
import heroRight from "../../../assets/images/hero-right.svg";
import Button from "../../../components/Button/Button";

const HeroSection = () => {
	return (
		<section className="hero">
			<img src={heroLeft} alt="hero-left" className="img-left" />

			<div className="hero-text">
				<p className="subheading">real-time tracking</p>
				<h1>Your #1 Trusted Source for Everything Crypto</h1>

				<p className="description">
					Stay ahead of the curve with our comprehensive platform. Get
					real-time price updates, in-depth market data, and all the
					latest information on a wide variety of cryptocurrencies.
				</p>

				<div className="btn-container">
					<Link to={"/register"}>
						<Button text="get started" />
					</Link>
					<Link to={"/explore"}>
						<Button text="explore" isGhost={true} />
					</Link>
				</div>
			</div>

			<img src={heroRight} alt="hero-right" className="img-right" />
		</section>
	);
};

export default HeroSection;
