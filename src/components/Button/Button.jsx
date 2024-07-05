import React from "react";
import "./Button.css";

const Button = (props) => {
	return (
		<div
			className={
				props.isGhost
					? "btn btn-ghost"
					: props.isWide
					? "btn btn-wide"
					: "btn"
			}
		>
			{props.text}
			{props.svg && <img src={props.svg} />}
		</div>
	);
};

export default Button;
