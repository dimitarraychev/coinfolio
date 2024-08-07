import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Loader from "../Loader/Loader";
import TableEndMessage from "../CryptoTable/TableEndMessage/TableEndMessage";

const InfiniteScroll = ({ isLoading, isLastPage, changePage }) => {
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && !isLastPage) {
			changePage((prevPage) => prevPage + 1);
		}
	}, [inView]);

	return (
		<>
			{!isLoading && isLastPage ? (
				<TableEndMessage
					message={
						<>
							<span>
								You've reached the end. Keep exploring or{" "}
							</span>
							<Link to={"/hub/create"} className="create-link">
								create a portfolio!
							</Link>
						</>
					}
				/>
			) : (
				<div ref={ref} className="loading">
					<Loader />
				</div>
			)}
		</>
	);
};

export default InfiniteScroll;
