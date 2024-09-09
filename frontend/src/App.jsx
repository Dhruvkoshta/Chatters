import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./routes/Home";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import useCheckAuth from "./hooks/useCheckAuth";
import { SocketContextProvider } from "./context/SocketContext";

function App() {
	const { user, setUser } = useAuthContext();
	const { checkAuth } = useCheckAuth();

	useEffect(() => {
		checkAuth();
	}, []);

	console.log(user);

	// redirect to home page if user is authenticated
	const RedirectAuthenticatedUser = ({ children }) => {
		if (user.isAuthenticated) {
			return <Navigate to='/' replace />;
		} else {
			return <>{children}</>;
		}
	};
	//redirect to login page if user is not authenticated
	const ProtectedRoute = ({ children }) => {
		if (!user.isAuthenticated) {
			return <Navigate to='/login' replace />;
		} else {
			return <>{children}</>;
		}
	};

	axios.defaults.withCredentials = true;
	if (user.isCheckingAuth) {
		return <Loader />;
	}
	return (
		<>
			<Routes>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<Login />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SocketContextProvider>
								<Home />
							</SocketContextProvider>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<RedirectAuthenticatedUser>
							<SignUp />
						</RedirectAuthenticatedUser>
					}
				/>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
