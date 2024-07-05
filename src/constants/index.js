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

export const categories = [
	{
		category_id: null,
		name: "All",
	},
	{
		category_id: "layer-1",
		name: "Layer 1 (L1)",
	},
	{
		category_id: "layer-2",
		name: "Layer 2 (L2)",
	},
	{
		category_id: "decentralized-finance-defi",
		name: "Decentralized Finance (DeFi)",
	},
	{
		category_id: "stablecoins",
		name: "Stablecoins",
	},
	{
		category_id: "artificial-intelligence",
		name: "Aritificial Intelligence (AI)",
	},
	{
		category_id: "storage",
		name: "Storage",
	},
	{
		category_id: "meme-token",
		name: "Meme",
	},
	{
		category_id: "privacy-coins",
		name: "Privacy",
	},
	{
		category_id: "ethereum-ecosystem",
		name: "Ethereum Ecosystem",
	},
	{
		category_id: "exchange-based-tokens",
		name: "Exchange-based Tokens",
	},
	{
		category_id: "gaming",
		name: "Gaming (GameFi)",
	},
	{
		category_id: "automated-market-maker-amm",
		name: "Automated Market Maker (AMM)",
	},
	{
		category_id: "yield-farming",
		name: "Yield Farming",
	},
];
