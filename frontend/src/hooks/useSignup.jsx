import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { user, setUser } = useAuthContext();

	const signup = async ({ name, email, password, confirmPassword, gender }) => {
		setLoading(true);
		if (!name || !email || !password || !confirmPassword || !gender) {
			toast.error("Please fill all the fields");
			return false;
		}
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return false;
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			return false;
		}
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_APP_URL}/api/auth/register`,
				{
					name,
					email,
					password,

					gender,
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
	return { signup, loading };
};
export default useSignup;
