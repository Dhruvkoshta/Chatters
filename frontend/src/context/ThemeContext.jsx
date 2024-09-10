import { useState, useEffect, createContext, useContext } from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "valentine"
	);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.querySelector("html").setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
