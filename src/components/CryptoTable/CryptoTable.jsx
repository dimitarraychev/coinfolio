import "./CryptoTable.css";

const CryptoTable = ({ columns, children, type }) => {
	return (
		<div className={"crypto-table " + type + "-table"}>
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
							"_" +
							col
								.replace("/", "-")
								.replace(" ", "-")
								.toLowerCase()
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
