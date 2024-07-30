import { useState } from "react";
import { toast } from "react-toastify";

import { useCurrentUser } from "../context/AuthContext";
import { updatePortfolio } from "../api/firebase-db";

const useFollowPortfolio = (portfolio, setFollowers) => {
	const { currentUser } = useCurrentUser();
	const [isLoading, setIsLoading] = useState(false);

	const isFollowing = portfolio.followers?.some(
		(f) => f === currentUser?.uid
	);
	const isFollowButtonDisabled = currentUser === null || isLoading;
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

		try {
			await updatePortfolio({
				...portfolio,
				followers,
			});

			setFollowers(followers);
			toast.success(message);
		} catch (error) {
			toast.error(error);
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
