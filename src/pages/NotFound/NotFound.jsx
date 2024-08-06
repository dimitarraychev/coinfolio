import { Link } from "react-router-dom";

import "./NotFound.css";
const notFound =
	"https://firebasestorage.googleapis.com/v0/b/coinfolio-109f2.appspot.com/o/assets%2Fnot-found.png?alt=media&token=af4547b8-ffa1-4ab8-9dfe-2665c08917ad";

import Button from "../../components/common/Button/Button";

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
