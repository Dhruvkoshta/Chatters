import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const useUpdateUser = () => {
	const [loading, setLoading] = useState(false);
	const { setUser } = useAuthContext();

	const updateUser = async (id, name, email, password, updatedPic) => {
		if (!id || !name || !email) {
			toast.error("Please fill all the fields");
			return;
		}
		try {
			setLoading(true);
			let data;
			if (updatedPic) {
				data = { id, name, email, password, profilePic: updatedPic };
			} else {
				data = { id, name, email, password };
			}
			const res = await axios.patch(
				`${import.meta.env.VITE_APP_URL}/api/users`,
				data
			);
			if (!res) {
				throw new Error("Something went wrong");
			}
			console.log(res.data);
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
			toast.success("User updated successfully");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { loading, updateUser };
};

export default useUpdateUser;
