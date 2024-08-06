import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/guards/ProtectedRoute/ProtectedRoute";
import AuthRedirect from "./components/guards/AuthRedirect/AuthRedirect";
import Loader from "./components/common/Loader/Loader";

import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Rankings from "./pages/Rankings/Rankings";
import Explore from "./pages/Explore/Explore";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import { useCoinContext } from "./context/CoinContext";

const PortfolioHub = lazy(() => import("./pages/PortfolioHub/PortfolioHub"));
const Portfolio = lazy(() => import("./pages/Portfolio/Portfolio"));
const Create = lazy(() => import("./pages/Create/Create"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const App = () => {
	const { isLoading, isError } = useCoinContext();

	if (isLoading) {
		return (
			<div className="app">
				<div className="loading loading-full">
					<Loader size={"15rem"} />
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="app">
				<div className="server-error">
					<h6>404 server not responding</h6>
					<h6>Please try again later</h6>
				</div>
			</div>
		);
	}

	return (
		<div className="app">
			<MainLayout>
				<Suspense
					fallback={
						<div className="loading loading-full">
							<Loader size={"15rem"} />
						</div>
					}
				>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/rankings" element={<Rankings />} />
						<Route path="/explore" element={<Explore />} />
						<Route path="/explore/:coinId" element={<Coin />} />
						<Route path="/hub" element={<PortfolioHub />} />
						<Route
							path="/hub/:portfolioId"
							element={<Portfolio />}
						/>

						<Route element={<AuthRedirect />}>
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
						</Route>

						<Route element={<ProtectedRoute />}>
							<Route
								path="/profile/:userId"
								element={<Profile />}
							/>
							<Route path="/hub/create" element={<Create />} />
						</Route>

						<Route path="*" element={<Navigate to={"/404"} />} />
						<Route path="/404" element={<NotFound />} />
					</Routes>
				</Suspense>
			</MainLayout>
		</div>
	);
};

export default App;
