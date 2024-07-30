import { useState } from "react";

import "./CategoriesMenu.css";
import categoriesIcon from "../../assets/icons/categories-icon.svg";

const CategoriesMenu = ({ categories, category, onCategoryChange }) => {
	const [isCategoriesShown, setIsCategoriesShown] = useState(true);

	const toggleCategoriesViewHandler = () =>
		setIsCategoriesShown((state) => !state);

	return (
		<div className="categories-wrapper">
			<p className="categories" onClick={toggleCategoriesViewHandler}>
				<img src={categoriesIcon} alt="filter" />
				Categories
			</p>

			<ul
				className={
					isCategoriesShown
						? "categories-list"
						: "categories-list cat-hide"
				}
			>
				{categories.map((cat) => (
					<li
						key={cat.category_id}
						onClick={() => onCategoryChange(cat.category_id)}
						className={
							!category &&
							(cat.category_id === "all" ||
								cat.category_id === "newest")
								? "category-active"
								: category === cat.category_id
								? "category-active"
								: ""
						}
					>
						{cat.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoriesMenu;
