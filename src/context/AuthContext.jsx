import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [shouldRefetch, setShouldRefetch] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL, metadata } = user;

				if (!displayName) return setShouldRefetch((state) => !state);

				setCurrentUser({
					uid,
					email,
					displayName,
					photoURL,
					lastSignIn: metadata.lastSignInTime,
					createdOn: metadata.creationTime,
				});
				setIsAuthenticated(true);
			} else {
				setCurrentUser(null);
				setIsAuthenticated(false);
			}
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, [shouldRefetch]);

	const contextValue = {
		currentUser,
		isLoading,
		isAuthenticated,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
