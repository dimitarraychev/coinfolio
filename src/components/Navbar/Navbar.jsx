import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import { CoinContext } from "../../context/CoinContext";

const Navbar = () => {
	const { setCurrency } = useContext(CoinContext);

	const currencyHandler = (e) => {
		switch (e.target.value) {
			case "usd": {
				setCurrency({ name: "usd", symbol: "$" });
				break;
			}
			case "eur": {
				setCurrency({ name: "eur", symbol: "€" });
				break;
			}
			default: {
				setCurrency({ name: "usd", symbol: "$" });
				break;
			}
		}
	};

	return (
		<div className="navbar">
			<img src={logo} alt="logo" className="logo" />
			<ul>
				<li>Top Cryptocurrencies</li>
				<li>Explore</li>
				<li>Portfolio Hub</li>
				<li>About Us</li>
			</ul>
			<div className="nav-right">
				<select onChange={currencyHandler}>
					<option value="usd">USD</option>
					<option value="eur">EUR</option>
				</select>
				<button>Sign Up</button>
			</div>
		</div>
	);
};

export default Navbar;
