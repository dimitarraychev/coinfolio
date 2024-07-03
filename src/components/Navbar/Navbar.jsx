import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";
import logo from "../../assets/logo.svg";
import userPlaceholder from "../../assets/user-placeholder.svg";

import { CoinContext } from "../../context/CoinContext";
import { navbarLinks } from "../../constants";

const Navbar = () => {
	const { setCurrency } = useContext(CoinContext);
	const { pathname } = useLocation();

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
			<Link to={"/"}>
				<img src={logo} alt="logo" className="logo" />
			</Link>
			<ul>
				{navbarLinks.map((link) => {
					const isActive = pathname === link.route;

					return (
						<Link to={link.route}>
							<li className={isActive && "link-active"}>
								<img
									src={isActive ? link.svgActive : link.svg}
									alt={link.label}
									className="link-img"
								/>
								{link.label}
							</li>
						</Link>
					);
				})}
			</ul>

			<div className="nav-right">
				<select onChange={currencyHandler}>
					<option value="usd">$USD</option>
					<option value="eur">€EUR</option>
				</select>
				<div className="user">
					<p>Guest</p>
					<img src={userPlaceholder} alt="user" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
