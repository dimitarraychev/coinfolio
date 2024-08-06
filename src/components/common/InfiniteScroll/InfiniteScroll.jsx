import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import arrowScroll from "../../../assets/icons/arrow-scroll.svg";
import Loader from "../Loader/Loader";

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
				<div className="end-message-wrapper">
					<p className="end-message">
						You've reached the end. Keep exploring or{" "}
						<Link to={"/hub/create"} className="create-link">
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
			) : (
				<div ref={ref} className="loading">
					<Loader />
				</div>
			)}
		</>
	);
};

export default InfiniteScroll;
