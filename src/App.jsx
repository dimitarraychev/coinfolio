import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Rankings from "./pages/Rankings/Rankings";
import Explore from "./pages/Explore/Explore";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import PortfolioHub from "./pages/PortfolioHub/PortfolioHub";
import Portfolio from "./pages/Portfolio/Portfolio";
import Create from "./pages/Create/Create";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import { useConfirmModalContext } from "./context/ConfirmModalContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
	const {
		isConfirmModalOpen,
		confirmModalMessage,
		closeConfirmModal,
		confirmAction,
	} = useConfirmModalContext();

	return (
		<div className="app">
			<Navbar />
			<BreadCrumbs />
			<Routes>
				{/* Public */}
				<Route path="/" element={<Home />} />
				<Route path="/rankings" element={<Rankings />} />
				<Route path="/explore" element={<Explore />} />
				<Route path="/explore/:coinId" element={<Coin />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/hub" element={<PortfolioHub />} />
				<Route path="/hub/:portfolioId" element={<Portfolio />} />
				<Route path="*" element={<Navigate to={"/404"} />} />
				<Route path="/404" element={<NotFound />} />

				{/* Private */}
				<Route element={<ProtectedRoute />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/hub/create" element={<Create />} />
				</Route>
			</Routes>
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
		</div>
	);
};

export default App;
