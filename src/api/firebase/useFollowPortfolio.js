import { useState } from "react";
import { toast } from "react-toastify";

import { useAuthContext } from "../../context/AuthContext";
import { updatePortfolio } from "./db";

const useFollowPortfolio = (portfolio, setFollowers) => {
	const { currentUser, isAuthenticated } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);

	const isFollowing = portfolio.followers?.some(
		(f) => f === currentUser?.uid
	);
	const isFollowButtonDisabled = !isAuthenticated || isLoading;
	const isFollowButtonVisible = currentUser?.uid !== portfolio.owner?.uid;

	const followHandler = async (e) => {
		e && e.preventDefault();

		if (isLoading) return;
		setIsLoading(true);

		let followers = portfolio.followers.slice(0);
		isFollowing
			? (followers = followers.filter((f) => f !== currentUser.uid))
			: followers.push(currentUser.uid);

		const message = isFollowing
			? `Success! You have unfollowed ${portfolio.title}.`
			: `Success! You are now following ${portfolio.title}.`;

		const followersCount = isFollowing
			? portfolio.followersCount--
			: portfolio.followersCount++;

		try {
			await updatePortfolio({
				...portfolio,
				followers,
				followersCount,
			});

			setFollowers(followers, followersCount);
			toast.success(message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isFollowing,
		isFollowButtonVisible,
		isFollowButtonDisabled,
		followHandler,
	};
};

export default useFollowPortfolio;
