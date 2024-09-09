import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setUser } = useAuthContext();
	const login = async ({ email, password }) => {
		setLoading(true);
		if (!email || !password) {
			toast.error("Please fill all the fields");
			return false;
		}

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_APP_URL}/api/auth/login`,
				{
					email,
					password,
				}
			);
			if (!res) {
				throw new Error("Something went wrong");
			}
			//localstorage
			localStorage.setItem("user", JSON.stringify(res.data.user));
			//context
			setUser((prev) => ({
				...prev,
				user: res.data.user,
				isAuthenticated: true,
				error: null,
				isCheckingAuth: false,
			}));
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { login, loading };
};
export default useLogin;
