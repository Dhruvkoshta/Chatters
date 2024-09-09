import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setUser } = useAuthContext();
	const logout = async () => {
		setLoading(true);

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_APP_URL}/api/auth/logout`
			);
			if (!res) {
				throw new Error("Something went wrong");
			}
			//localstorage
			localStorage.removeItem("user");
			//context
			setUser((prev) => ({
				...prev,
				user: null,
				isAuthenticated: false,
				error: null,
				isCheckingAuth: false,
			}));
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { logout, loading };
};
export default useLogout;
