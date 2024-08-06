import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar/Navbar";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
import NavbarMobile from "./NavbarMobile/NavbarMobile";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import Footer from "./Footer/Footer";
import { useConfirmModalContext } from "../../context/ConfirmModalContext";

const MainLayout = ({ children }) => {
	const {
		isConfirmModalOpen,
		confirmModalMessage,
		closeConfirmModal,
		confirmAction,
	} = useConfirmModalContext();

	return (
		<>
			<Navbar />
			<BreadCrumbs />
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

			{children}

			<ConfirmModal
				isOpen={isConfirmModalOpen}
				message={confirmModalMessage}
				onClose={closeConfirmModal}
				onConfirm={confirmAction}
			/>
			<NavbarMobile />
			<ScrollToTop />
			<Footer />
		</>
	);
};

export default MainLayout;
