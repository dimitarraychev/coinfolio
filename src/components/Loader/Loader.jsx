import "./Loader.css";

const Loader = ({ size }) => {
	return (
		<div className="dot-spinner" style={{ "--uib-size": size }}>
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
