import { useState } from "react";
import Avatar from "react-avatar";

import "./Profile.css";
import profileIcon from "../../assets/icons/profile-icon.svg";
import uploadIcon from "../../assets/icons/upload-icon.svg";
import userPlaceholder from "../../assets/user-placeholder.svg";

import { useAuthContext } from "../../context/AuthContext";
import useGetPorfolios from "../../api/firebase/useGetPortfolios";
import CryptoTable from "../../components/common/CryptoTable/CryptoTable";
import PortfolioTableRow from "../../components/common/CryptoTable/PortfolioTableRow/PortfolioTableRow";
import CategoriesMenu from "../../components/common/CategoriesMenu/CategoriesMenu";
import FileUploader from "../../components/common/FileUploader/FileUploader";
import InfiniteScroll from "../../components/common/InfiniteScroll/InfiniteScroll";
import { profileCategories } from "../../constants/categories";

const Profile = () => {
	const { currentUser, isAuthenticated } = useAuthContext();
	const defaultCategory = "owned";
	const [isUploaderOpen, setIsUploaderOpen] = useState(false);

	const {
		portfolios,
		category,
		isLoading,
		hasNoFollowing,
		hasNoOwned,
		isLastPage,
		changeCategory,
		changePage,
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
					{isAuthenticated ? (
						currentUser.photoURL ? (
							<img
								src={currentUser.photoURL}
								alt="profile"
								className="profile-img"
							/>
						) : (
							<Avatar
								name={currentUser.displayName}
								className="profile-avatar"
								round={true}
								maxInitials={2}
								size="17rem"
								textSizeRatio={2.5}
							/>
						)
					) : (
						<img
							src={userPlaceholder}
							alt="profile"
							className="profile-img"
						/>
					)}

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
				</div>
				<div className="list-wrapper">
					<ul>
						<li>Username</li>
						<li className="username">@{currentUser.displayName}</li>
					</ul>
					<ul>
						<li>Email</li>
						<li>{currentUser.email}</li>
					</ul>
					<ul>
						<li>Last Sign In</li>
						<li>{currentUser.lastSignIn}</li>
					</ul>
					<ul>
						<li>Created On</li>
						<li>{currentUser.createdOn}</li>
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
					{isLoading === false && noResultsMessage !== "" ? (
						<h6 className="no-portfolios">{noResultsMessage}</h6>
					) : (
						portfolios.map((portfolio, index) => (
							<PortfolioTableRow
								portfolio={portfolio}
								key={portfolio.id}
								index={index + 1}
							/>
						))
					)}
					<InfiniteScroll
						isLoading={isLoading}
						isLastPage={isLastPage}
						changePage={changePage}
					/>
				</CryptoTable>
			</div>
		</section>
	);
};

export default Profile;
