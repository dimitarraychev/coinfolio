import { Link } from "react-router-dom";

import "./Profile.css";
import profileIcon from "../../assets/icons/profile-icon.svg";
import uploadIcon from "../../assets/icons/upload-icon.svg";
import userPlaceholder from "../../assets/user-placeholder.svg";
import arrowScroll from "../../assets/icons/arrow-scroll.svg";

import { useAuthContext } from "../../context/AuthContext";
import PortfolioTableRow from "../../components/PortfolioTableRow/PortfolioTableRow";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";
import Loader from "../../components/Loader/Loader";
import useGetPorfolios from "../../hooks/useGetPortfolios";
import { profileCategories } from "../../constants/categories";
import FileUploader from "../../components/FileUploader/FileUploader";
import { useState } from "react";

const Profile = () => {
	const { currentUser } = useAuthContext();
	const defaultCategory = "owned";
	const [isUploaderOpen, setIsUploaderOpen] = useState(false);

	const canChangeProfileImage = currentUser.signInMethod === "password";

	const {
		portfolios,
		category,
		isLoading,
		hasNoFollowing,
		hasNoOwned,
		changeCategory,
	} = useGetPorfolios(defaultCategory);

	const noResultsMessage = hasNoFollowing
		? "You haven't followed any portfolios yet."
		: hasNoOwned
		? "You don't have any created portfolios yet."
		: "";

	return (
		<section className="profile">
			<h2 className="page-header">
				<img src={profileIcon} alt="profile" />
				Profile
			</h2>

			<div className="profile-data">
				<div className="image-wrapper">
					<img
						src={currentUser?.photoURL || userPlaceholder}
						alt="profile"
						className={"profile-img"}
					/>
					{canChangeProfileImage && (
						<>
							<img
								src={uploadIcon}
								alt="edit"
								className="edit-profile-img-icon"
								title="Upload Image"
								onClick={() => setIsUploaderOpen(true)}
							/>
							<FileUploader
								isOpen={isUploaderOpen}
								closeUploader={() => setIsUploaderOpen(false)}
							/>
						</>
					)}
				</div>
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

			<CategoriesMenu
				categories={profileCategories}
				selectedCategory={category}
				defaultCategory={defaultCategory}
				onCategoryChange={changeCategory}
			/>

			<div className="portfolios-wrapper">
				<CryptoTable
					columns={[
						"#",
						"Portfolios",
						"Allocation",
						"Profit/Loss",
						"Followers",
					]}
					type={"portfolio"}
				>
					{isLoading ? (
						<div className="loading">
							<Loader />
						</div>
					) : noResultsMessage !== "" ? (
						<h6 className="no-portfolios">{noResultsMessage}</h6>
					) : (
						<>
							{portfolios.map((portfolio, index) => (
								<PortfolioTableRow
									portfolio={portfolio}
									key={portfolio.id}
									index={index + 1}
								/>
							))}
							<div className="end-message-wrapper">
								<p className="end-message">
									You've reached the end. Keep exploring or{" "}
									<Link
										to={"/hub/create"}
										className="create-link"
									>
										create a portfolio!
									</Link>
								</p>
								<img
									src={arrowScroll}
									alt="top"
									title="Back To Top"
									className="scroll-top-image"
									onClick={() =>
										window.scrollTo({
											top: 0,
											behavior: "smooth",
										})
									}
								/>
							</div>
						</>
					)}
				</CryptoTable>
			</div>
		</section>
	);
};

export default Profile;
