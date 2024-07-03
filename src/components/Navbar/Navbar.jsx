import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import logo from "../../assets/logo.svg";
import homeIcon from "../../assets/icons/home-icon.svg";
import rankIcon from "../../assets/icons/rank-icon.svg";
import exploreIcon from "../../assets/icons/explore-icon.svg";
import portfolioIcon from "../../assets/icons/portfolio-icon.svg";
import userPlaceholder from "../../assets/user-placeholder.svg";

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
			<Link to={"/"}>
				<img src={logo} alt="logo" className="logo" />
			</Link>
			<ul>
				<Link to={"/"}>
					<li>
						<img src={homeIcon} alt="home" className="link-img" />
						Home
					</li>
				</Link>
				<Link to={"/rankings"}>
					<li>
						<img
							src={rankIcon}
							alt="ranking"
							className="link-img"
						/>
						Rankings
					</li>
				</Link>
				<Link to={"/explore"}>
					<li>
						<img
							src={exploreIcon}
							alt="explore"
							className="link-img"
						/>
						Explore
					</li>
				</Link>
				<Link to={"/hub"}>
					<li>
						<img
							src={portfolioIcon}
							alt="portfolio hub"
							className="link-img"
						/>
						Portfolio Hub
					</li>
				</Link>
			</ul>
			<div className="nav-right">
				<select onChange={currencyHandler}>
					<option value="usd">USD</option>
					<option value="eur">EUR</option>
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
