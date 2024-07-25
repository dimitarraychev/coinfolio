import React from "react";
import "./NotFound.css";
import notFound from "../../assets/images/not-found.png";

const NotFound = () => {
	return (
		<section className="not-found">
			<img src={notFound} alt="404" />
			<h4>Oops! You found a dead end...</h4>
		</section>
	);
};

export default NotFound;
