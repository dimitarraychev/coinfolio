import React, { useState } from "react";
import "./CategoriesMenu.css";
import categoriesIcon from "../../assets/icons/categories-icon.svg";
import { categories } from "../../constants/index";

const CategoriesMenu = ({ category, onCategoryChange }) => {
	const [isCategoriesShown, setIsCategoriesShown] = useState(true);

	const toggleCategoriesViewHandler = (e) => {
		setIsCategoriesShown((state) => !state);
	};

	return (
		<div className="categories-wrapper">
			<label className="categories" onClick={toggleCategoriesViewHandler}>
				<img src={categoriesIcon} alt="filter" />
				Categories
			</label>
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
							category == cat.category_id ? "category-active" : ""
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
