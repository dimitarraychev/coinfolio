import "./Profile.css";
import profileIcon from "../../assets/icons/profile-icon.svg";
import userPlaceholder from "../../assets/user-placeholder.svg";

import { useCurrentUser } from "../../context/AuthContext";
import PortfolioTableRow from "../../components/PortfolioTableRow/PortfolioTableRow";
import CryptoTable from "../../components/CryptoTable/CryptoTable";

const Profile = () => {
	const { currentUser } = useCurrentUser();

	return (
		<section className="profile">
			<h2 className="page-header">
				<img src={profileIcon} alt="profile" />
				Profile
			</h2>

			<div className="profile-data">
				<img
					src={currentUser?.photoURL || userPlaceholder}
					alt="profile"
					className="profile-img"
				/>
				<div className="list-wrapper">
					<ul>
						<li>Username</li>
						<li className="username">
							@{currentUser?.displayName}
						</li>
					</ul>
					<ul>
						<li>Email</li>
						<li>{currentUser?.email}</li>
					</ul>
					<ul>
						<li>Last Sign In</li>
						<li>{currentUser?.lastSignIn}</li>
					</ul>
					<ul>
						<li>Created on</li>
						<li>{currentUser?.createdOn}</li>
					</ul>
				</div>
			</div>

			<h3 className="portfolios-title">Your Porfolios</h3>

			<div className="portfolios-wrapper">
				<CryptoTable
					columns={[
						"#",
						"Portfolios",
						"Allocation",
						"Profit/Loss",
						"Followers",
					]}
				></CryptoTable>
			</div>
		</section>
	);
};

export default Profile;
