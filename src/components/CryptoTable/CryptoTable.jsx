import React from "react";
import "./CryptoTable.css";

const CryptoTable = (props) => {
	return (
		<div className="crypto-table">
			<div className="table-layout">
				<p>#</p>
				<p>Coins</p>
				<p>Price</p>
				<p style={{ textAlign: "center" }}>24H Change</p>
				<p className="market-cap">Market Cap</p>
			</div>
			{props.children}
		</div>
	);
};

export default CryptoTable;
