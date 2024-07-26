import { createContext, useState, useEffect, useContext } from "react";
import { checkAuth } from "../api/firebase-auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = checkAuth((user) => {
			const { uid, email, displayName } = user;
			setCurrentUser({ uid, email, displayName });
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useCurrentUser = () => useContext(AuthContext);
