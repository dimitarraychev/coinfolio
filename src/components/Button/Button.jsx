import React from "react";
import "./Button.css";
import { buttonIcons } from "../../constants/button";

const Button = ({ text, isGhost, isWide }) => {
	const hasSVG = buttonIcons.find((btn) => btn.text.includes(text));

	return (
		<button
			className={
				isGhost ? "btn btn-ghost" : isWide ? "btn btn-wide" : "btn"
			}
		>
			{text}
			{hasSVG && <img src={hasSVG.svg} />}
		</button>
	);
};

export default Button;
