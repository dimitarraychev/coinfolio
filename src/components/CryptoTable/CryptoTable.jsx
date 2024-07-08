import React from "react";
import "./CryptoTable.css";

const CryptoTable = ({ columns, children }) => {
	return (
		<div className="crypto-table">
			<div className="table-layout">
				{columns.map((col) => (
					<p key={col}>{col}</p>
				))}
			</div>
			{children}
		</div>
	);
};

export default CryptoTable;
