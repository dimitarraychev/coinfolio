import React from "react";
import "./Button.css";

const Button = (props) => {
	return (
		<button
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
		</button>
	);
};

export default Button;
