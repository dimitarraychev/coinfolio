import React from "react";
import "./CryptoTable.css";

const CryptoTable = (props) => {
	return (
		<div className="crypto-table">
			<div className="table-layout">
				{props.columns.map((col) => (
					<p>{col}</p>
				))}
			</div>
			{props.children}
		</div>
	);
};

export default CryptoTable;
