import { Link } from "react-router-dom";

import CoinTableRow from "../../../components/common/CryptoTable/CoinTableRow/CoinTableRow";
import CryptoTable from "../../../components/common/CryptoTable/CryptoTable";
import Button from "../../../components/common/Button/Button";

const RankingsSection = ({ allCoins }) => {
	return (
		<section className="home-rankings">
			<p className="subheading">global rankings</p>
			<h2>Top Cryptocurrencies By Market Cap</h2>

			<CryptoTable
				columns={[
					"#",
					"Coins",
					"Price",
					"24h Change",
					"7d Change",
					"Market Cap",
				]}
				type={"coin"}
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
