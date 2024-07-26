import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";
import logo from "../../assets/logo.svg";
import userPlaceholder from "../../assets/user-placeholder.svg";
import loginIcon from "../../assets/icons/login-icon.svg";
import logoutIcon from "../../assets/icons/logout-icon.svg";
import registerIcon from "../../assets/icons/register-icon.svg";

import { useCoinContext } from "../../context/CoinContext";
import { navbarLinks } from "../../constants/links";
import { logout } from "../../api/firebase-auth";

const Navbar = () => {
	const { setCurrency } = useCoinContext();
	const { pathname } = useLocation();

	const [isMenuShown, setIsMenuShown] = useState(false);

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

	const userMenuHandler = () => {
		setIsMenuShown((state) => !state);
	};

	return (
		<div className="navbar">
			<Link to={"/"}>
				<img src={logo} alt="logo" className="logo" />
			</Link>
			<ul className="navbar-links">
				{navbarLinks.map((link) => {
					// const isActive = pathname === link.route;
					const isHomeRoute = link.route === "/";
					const isActive = isHomeRoute
						? pathname === "/"
						: pathname.startsWith(link.route) && link.route !== "/";

					return (
						<Link to={link.route} key={link.label}>
							<li className={isActive ? "link-active" : ""}>
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
				<select onChange={currencyHandler} name="currency">
					<option value="usd">$USD</option>
					<option value="eur">€EUR</option>
				</select>

				<div className="user" onClick={userMenuHandler}>
					<p>Guest</p>
					<img
						src={userPlaceholder}
						alt="user"
						className="user-image"
					/>

					<ul
						className={isMenuShown ? "user-menu show" : "user-menu"}
					>
						<Link to={"/register"}>
							<li>
								<img
									src={registerIcon}
									alt="register"
									className="link-img"
								/>
								<p>Register</p>
							</li>
						</Link>

						<Link to={"/login"}>
							<li>
								<img
									src={loginIcon}
									alt="login"
									className="link-img"
								/>
								<p>Login</p>
							</li>
						</Link>

						<li onClick={logout}>
							<img
								src={logoutIcon}
								alt="logout"
								className="link-img"
							/>
							<p>Logout</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
