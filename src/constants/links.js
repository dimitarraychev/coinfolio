import homeIcon from "../assets/icons/home-icon-white.svg";
import homeIconActive from "../assets/icons/home-icon.svg";
import rankIcon from "../assets/icons/rank-icon-white.svg";
import rankIconActive from "../assets/icons/rank-icon.svg";
import exploreIcon from "../assets/icons/explore-icon-white.svg";
import exploreIconActive from "../assets/icons/explore-icon.svg";
import portfolioIcon from "../assets/icons/portfolio-icon-white.svg";
import portfolioIconActive from "../assets/icons/portfolio-icon.svg";

export const navbarLinks = [
	{
		svg: homeIcon,
		svgActive: homeIconActive,
		route: "/",
		label: "Home",
	},
	{
		svg: rankIcon,
		svgActive: rankIconActive,
		route: "/rankings",
		label: "Rankings",
	},
	{
		svg: exploreIcon,
		svgActive: exploreIconActive,
		route: "/explore",
		label: "Explore",
	},
	{
		svg: portfolioIcon,
		svgActive: portfolioIconActive,
		route: "/hub",
		label: "Porfolio Hub",
	},
];
