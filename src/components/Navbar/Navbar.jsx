import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";

const Navbar = () => {
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
				<select name="" id="">
					<option value="usd">USD</option>
					<option value="eur">EUR</option>
					<option value="bgn">BGN</option>
				</select>
				<button>Sign Up</button>
			</div>
		</div>
	);
};

export default Navbar;
