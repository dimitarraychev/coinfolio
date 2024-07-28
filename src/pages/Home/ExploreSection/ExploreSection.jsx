import { Link } from "react-router-dom";
import homeExplore from "../../../assets/images/home-explore.svg";
import Button from "../../../components/Button/Button";

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
