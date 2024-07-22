import plusIcon from "../assets/icons/plus-icon.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import followIcon from "../assets/icons/follow-icon.svg";
import deleteIcon from "../assets/icons/delete-icon.svg";
import editIcon from "../assets/icons/edit-icon.svg";
import exploreIcon from "../assets/icons/explore-icon-white.svg";
import rankingsIcon from "../assets/icons/rank-icon-white.svg";
import portfolioIcon from "../assets/icons/portfolio-icon-white.svg";
import confirmIcon from "../assets/icons/confirm-icon.svg";

export const buttonIcons = [
	{
		text: ["follow"],
		svg: followIcon,
	},
	{
		text: ["create portfolio", "add coin"],
		svg: plusIcon,
	},
	{
		text: [
			"sign up",
			"sign in",
			"get started",
			"join our platform now",
			"publish portfolio",
		],
		svg: arrowRight,
	},
	{
		text: ["delete"],
		svg: deleteIcon,
	},
	{
		text: ["edit"],
		svg: editIcon,
	},
	{
		text: ["explore", "search"],
		svg: exploreIcon,
	},
	{
		text: ["check rankings"],
		svg: rankingsIcon,
	},
	{
		text: ["save"],
		svg: confirmIcon,
	},
	{
		text: ["check portfolios"],
		svg: portfolioIcon,
	},
];
