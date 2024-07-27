import React from "react";
import "./Button.css";
import { buttonIcons } from "../../constants/button";

const Button = ({
	text,
	type,
	isDisabled = false,
	isGhost,
	isWide,
	onClick,
}) => {
	const hasSVG = buttonIcons.find((btn) => btn.text.includes(text));
	const isDelete = text === "delete";

	const clickHandler = (e) => {
		if (!isDisabled && onClick) onClick(e);
	};

	return (
		<button
			type={type ? type : "button"}
			onClick={clickHandler}
			className={
				isGhost
					? "btn btn-ghost"
					: isDisabled
					? "btn btn-disabled"
					: isDelete
					? "btn btn-del"
					: "btn"
			}
		>
			{text}
			{hasSVG && <img src={hasSVG.svg} />}
		</button>
	);
};

export default Button;
