import React from "react";
import { Link } from "react-router-dom";

import CoinTableRow from "../../../components/CoinTableRow/CoinTableRow";
import CryptoTable from "../../../components/CryptoTable/CryptoTable";
import Button from "../../../components/Button/Button";

const RankingsSection = ({ allCoins }) => {
	return (
		<section className="home-rankings">
			<p className="subheading">global rankings</p>
			<h2>Top Cryptocurrencies By Market Cap</h2>

			<CryptoTable
				columns={["#", "Coins", "Price", "24H Change", "Market Cap"]}
			>
				{allCoins.slice(0, 3).map((coin) => (
					<CoinTableRow coin={coin} key={coin.id} />
				))}
			</CryptoTable>

			<Link to={"/rankings"} className="home-btn-rankings">
				<Button text="check rankings" />
			</Link>
		</section>
	);
};

export default RankingsSection;
