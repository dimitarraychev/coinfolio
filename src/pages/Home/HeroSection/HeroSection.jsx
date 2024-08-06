import { Link } from "react-router-dom";
import Button from "../../../components/common/Button/Button";

const heroLeft =
	"https://firebasestorage.googleapis.com/v0/b/coinfolio-109f2.appspot.com/o/assets%2Fhero-left.svg?alt=media&token=1682549c-241b-4831-b012-adedd7c00e17";
const heroRight =
	"https://firebasestorage.googleapis.com/v0/b/coinfolio-109f2.appspot.com/o/assets%2Fhero-right.svg?alt=media&token=2ef94624-ae33-405c-81f2-0ece17bed684";

const HeroSection = () => {
	return (
		<section className="hero">
			<img src={heroLeft} alt="hero-left" className="img-left" />

			<div className="hero-text">
				<p className="subheading">real-time tracking</p>
				<h1>Your #1 Trusted Source for Everything Crypto</h1>

				<p className="description">
					Stay ahead of the curve with our comprehensive platform. Get
					real-time price updates, in-depth market data, and all the
					latest information on a wide variety of cryptocurrencies.
				</p>

				<div className="btn-container">
					<Link to={"/register"}>
						<Button text="get started" />
					</Link>
					<Link to={"/explore"}>
						<Button text="explore" isGhost={true} />
					</Link>
				</div>
			</div>

			<img src={heroRight} alt="hero-right" className="img-right" />
		</section>
	);
};

export default HeroSection;
