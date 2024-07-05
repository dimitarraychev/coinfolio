import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.svg";
import githubLogo from "../../assets/logos/github.svg";
import linkedInLogo from "../../assets/logos/linkedin.svg";
import coinGeckoLogo from "../../assets/logos/coingecko.svg";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-about">
				<img src={logo} alt="logo" className="logo" />
				<p className="motto">
					Stay Ahead In The Crypto Market With Our Platform
				</p>

				<div className="logos-wrapper">
					<Link
						to={"https://github.com/dimitarraychev"}
						target="_blank"
					>
						<img
							src={githubLogo}
							alt="github"
							className="github-link"
						/>
					</Link>

					<Link
						to={"https://www.linkedin.com/in/dimitaraychev/"}
						target="_blank"
					>
						<img src={linkedInLogo} alt="linkedin" />
					</Link>
				</div>

				<p className="coingecko">
					Powered by{" "}
					<img
						src={coinGeckoLogo}
						alt="coinGecko"
						className="coingecko-logo"
					/>
				</p>

				<p>Copyright @ 2024, CoinFol.io - All Rights Reserved.</p>
			</div>

			<div className="footer-right">
				<div className="footer-market">
					<h6>Market</h6>
					<Link to={"/rankings"}>
						<p>Rankings</p>
					</Link>
					<Link to={"/explore"}>
						<p>Explore</p>
					</Link>
				</div>

				<div className="footer-portfolio">
					<h6>Portfolio</h6>
					<Link to={"/hub"}>
						<p>Porfolio Hub</p>
					</Link>
					<Link to={"/hub/create"}>
						<p>Create</p>
					</Link>
				</div>

				<div className="footer-user">
					<h6>User</h6>
					<Link to={"/register"}>
						<p>Register</p>
					</Link>
					<Link to={"login"}>
						<p>Login</p>
					</Link>
					<Link to={"hub/username"}>
						<p>My Portfolios</p>
					</Link>
					<Link to={"logout"}>
						<p>Logout</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
