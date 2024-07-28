import "./Loader.css";

const Loader = (props) => {
	return (
		<div className="dot-spinner" style={{ "--uib-size": props.size }}>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
		</div>
	);
};

export default Loader;
