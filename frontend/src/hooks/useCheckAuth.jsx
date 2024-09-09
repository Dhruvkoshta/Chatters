import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useCheckAuth = () => {
	const { setUser } = useAuthContext();

	const checkAuth = async () => {
		setUser((prev) => ({
			...prev,
			isCheckingAuth: true,
		}));
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_APP_URL}/api/auth/check-auth`
			);
			setUser((prev) => ({
				...prev,
				user: res.data.user,
				isAuthenticated: true,
				error: null,
				isCheckingAuth: false,
			}));
		} catch (error) {
			setUser((prev) => ({
				...prev,
				error: error.message,
				isAuthenticated: false,
				isCheckingAuth: false,
			}));
		}
	};
	return { checkAuth };
};

export default useCheckAuth;
