import { Link } from "react-router-dom";
import Button from "../../../components/common/Button/Button";

const CtaSection = () => {
	return (
		<section className="home-cta">
			<div className="cta-text">
				<h2>Elevate Your Crypto Journey</h2>
				<p>
					Receive real-time updates, create and manage your
					personalized cryptocurrency portfolio, compare its
					performance with others, and stay ahead of market trends.
					Our platform empowers you with comprehensive tools to
					navigate the dynamic crypto landscape with confidence.
				</p>
			</div>
			<Link to={"/register"}>
				<Button text="join our platform now"></Button>
			</Link>
		</section>
	);
};

export default CtaSection;
