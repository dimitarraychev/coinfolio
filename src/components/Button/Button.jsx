import React from "react";
import "./Button.css";
import { buttonIcons } from "../../constants/button";

const Button = ({ text, isGhost, isWide, type, onClick }) => {
	const hasSVG = buttonIcons.find((btn) => btn.text.includes(text));
	const isDelete = text === "delete";

	return (
		<button
			type={type != null ? type : "button"}
			onClick={onClick}
			className={
				isGhost
					? "btn btn-ghost"
					: isWide
					? "btn btn-wide"
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
