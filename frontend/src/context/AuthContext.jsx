import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({
		user: JSON.parse(localStorage.getItem("user")) || null,
		isAuthenticated: false,
		error: null,
		isCheckingAuth: true,
	});

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
