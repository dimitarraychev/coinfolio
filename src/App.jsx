import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Rankings from "./pages/Rankings/Rankings";
import Explore from "./pages/Explore/Explore";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import PortfolioHub from "./pages/PortfolioHub/PortfolioHub";
import Portfolio from "./pages/Portfolio/Portfolio";

const App = () => {
	return (
		<div className="app">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/rankings" element={<Rankings />} />
				<Route path="/explore" element={<Explore />} />
				<Route path="/coin/:coinId" element={<Coin />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/hub" element={<PortfolioHub />} />
				<Route path="/portfolio/:portfolioId" element={<Portfolio />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
