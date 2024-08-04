import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";
import NavbarMobile from "./components/NavbarMobile/NavbarMobile";
import Loader from "./components/Loader/Loader";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Rankings from "./pages/Rankings/Rankings";
import Explore from "./pages/Explore/Explore";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import { useCoinContext } from "./context/CoinContext";
import { useConfirmModalContext } from "./context/ConfirmModalContext";

const PortfolioHub = lazy(() => import("./pages/PortfolioHub/PortfolioHub"));
const Portfolio = lazy(() => import("./pages/Portfolio/Portfolio"));
const Create = lazy(() => import("./pages/Create/Create"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const App = () => {
	const {
		isConfirmModalOpen,
		confirmModalMessage,
		closeConfirmModal,
		confirmAction,
	} = useConfirmModalContext();
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
			<Navbar />
			<BreadCrumbs />
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
					<Route path="/hub/:portfolioId" element={<Portfolio />} />

					<Route element={<AuthRedirect />}>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Route>

					<Route element={<ProtectedRoute />}>
						<Route path="/profile/:userId" element={<Profile />} />
						<Route path="/hub/create" element={<Create />} />
					</Route>

					<Route path="*" element={<Navigate to={"/404"} />} />
					<Route path="/404" element={<NotFound />} />
				</Routes>
			</Suspense>
			<ScrollToTop />
			<ToastContainer
				position="top-right"
				theme="dark"
				transition:Bounce
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				rtl={false}
				closeOnClick
				draggable
				pauseOnFocusLoss
				pauseOnHover
			/>
			<ConfirmModal
				isOpen={isConfirmModalOpen}
				message={confirmModalMessage}
				onClose={closeConfirmModal}
				onConfirm={confirmAction}
			/>
			<Footer />
			<NavbarMobile />
		</div>
	);
};

export default App;
