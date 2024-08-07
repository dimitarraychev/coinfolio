import arrowScroll from "../../../../assets/icons/arrow-scroll.svg";

const TableEndMessage = ({ message }) => {
	return (
		<div className="end-message-wrapper">
			<p className="end-message">{message}</p>
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
	);
};

export default TableEndMessage;
