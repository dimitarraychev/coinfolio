import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";

const homeExplore =
	"https://firebasestorage.googleapis.com/v0/b/coinfolio-109f2.appspot.com/o/assets%2Fhome-explore.svg?alt=media&token=ad77d5eb-b7bb-41bb-bf5e-6d56adc8f4e2";

const ExploreSection = () => {
	return (
		<section className="home-explore">
			<img
				src={homeExplore}
				alt="portfolio"
				className="home-section-img"
			/>

			<div className="home-explore-text">
				<p className="subheading">monitor markets</p>
				<h2>Discover Crypto Sectors & Market Trends</h2>
				<p>
					Access relevant data and in-depth insights into the crypto
					market. Analyze emerging trends across various sectors to
					make informed investment decisions and capitalize on market
					opportunities.
				</p>

				<Link to={"/explore"} className="home-btn-explore">
					<Button text="explore" />
				</Link>
			</div>
		</section>
	);
};

export default ExploreSection;
