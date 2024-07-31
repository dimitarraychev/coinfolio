import { Link } from "react-router-dom";

import "./Footer.css";
import logo from "../../assets/logo.svg";
import githubLogo from "../../assets/logos/github.svg";
import linkedInLogo from "../../assets/logos/linkedin.svg";
import coinGeckoLogo from "../../assets/logos/coingecko.svg";

import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

const Footer = () => {
	const { currentUser, isAuthenticated } = useAuthContext();
	const { logoutHandler } = useLogout();

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
						<p>Portfolio Hub</p>
					</Link>
					<Link to={"/hub/create"}>
						<p>Create Portfolio</p>
					</Link>
					{isAuthenticated && (
						<Link to={`profile/${currentUser.uid}`}>
							<p>Your Portfolios</p>
						</Link>
					)}
				</div>

				<div className="footer-user">
					<h6>User</h6>
					{isAuthenticated ? (
						<>
							<Link to={`profile/${currentUser.uid}`}>
								<p>Profile</p>
							</Link>
							<p className="logout" onClick={logoutHandler}>
								Logout
							</p>
						</>
					) : (
						<>
							<Link to={"/register"}>
								<p>Register</p>
							</Link>
							<Link to={"/login"}>
								<p>Login</p>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Footer;
