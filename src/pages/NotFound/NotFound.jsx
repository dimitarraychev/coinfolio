import { Link } from "react-router-dom";

import "./NotFound.css";
import notFound from "../../assets/images/not-found.png";

import Button from "../../components/Button/Button";

const NotFound = () => {
	return (
		<section className="not-found">
			<img src={notFound} alt="404" className="not-found-img" />
			<h4>Oops! You found a dead end...</h4>
			<Link to={"/"}>
				<Button text={"back to home"} isGhost={true} />
			</Link>
		</section>
	);
};

export default NotFound;
