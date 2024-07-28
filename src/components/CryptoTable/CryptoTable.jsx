import "./CryptoTable.css";

const CryptoTable = ({ columns, children }) => {
	return (
		<div className="crypto-table">
			<div
				className={
					columns.length <= 5
						? "table-header"
						: "table-header six-col"
				}
			>
				{columns.map((col) => (
					<p
						className={
							col.includes("Change")
								? "change"
								: col.includes("Profit/Loss")
								? "profit-loss"
								: ""
						}
						key={col}
					>
						{col}
					</p>
				))}
			</div>
			{children}
		</div>
	);
};

export default CryptoTable;
