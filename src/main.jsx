import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import CoinContextProvider from "./context/CoinContext.jsx";
import ConfirmModalProvider from "./context/ConfirmModalContext";
import AuthContextProvider from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthContextProvider>
			<CoinContextProvider>
				<ConfirmModalProvider>
					<App />
				</ConfirmModalProvider>
			</CoinContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
);
