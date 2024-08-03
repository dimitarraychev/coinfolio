import "./CryptoTable.css";
import arrowFilterDesc from "../../assets/icons/arrow-filter-desc.svg";
import arrowFilterAsc from "../../assets/icons/arrow-filter-asc.svg";

const CryptoTable = ({
	columns,
	children,
	type,
	canSort,
	tableSortHandler,
	selectedSortField,
	isAscendingOrder,
}) => {
	const translateToClassName = (stringToTranslate) => {
		if (stringToTranslate === "#") return "hashtag";
		return (
			"_" +
			stringToTranslate.replace("/", "-").replace(" ", "-").toLowerCase()
		);
	};

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
							canSort
								? translateToClassName(col)
								: translateToClassName(col) + " unsortable"
						}
						key={col}
						onClick={(e) =>
							canSort && col !== "#" && tableSortHandler(e)
						}
					>
						{col}
						{canSort &&
							col !== "#" &&
							selectedSortField === translateToClassName(col) && (
								<img
									src={
										isAscendingOrder
											? arrowFilterAsc
											: arrowFilterDesc
									}
									alt="asc"
									className={
										"arrow-sort " +
										translateToClassName(col)
									}
								/>
							)}
					</p>
				))}
			</div>
			{children}
		</div>
	);
};

export default CryptoTable;
