import { useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const SignUp = ({ URL, user, setUser }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const { login, loading } = useLogin();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login({ ...formData });
		navigate("/");
	};
	return loading ? (
		<Loader />
	) : (
		<>
			<div className='hero bg-base-200 min-h-screen'>
				<div className='hero-content flex-col lg:flex-row-reverse'>
					<div className='text-center lg:text-left'>
						<h1 className='text-5xl font-bold'>Login now!</h1>
						<p className='py-6'>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam,
							enim?.
						</p>
					</div>
					<div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
						<form className='card-body' onSubmit={handleSubmit}>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Email</span>
								</label>
								<input
									type='email'
									placeholder='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									className='input input-bordered'
									required
								/>
							</div>

							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Password</span>
								</label>
								<input
									type='password'
									placeholder='Password'
									className='input input-bordered'
									required
									name='password'
									value={formData.password}
									onChange={handleChange}
								/>
							</div>

							<div className='form-control mt-6'>
								<button className='btn btn-primary' type='submit'>
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
