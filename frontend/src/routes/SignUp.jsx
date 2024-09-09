import { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const SignUp = ({ URL, user, setUser }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: "Male",
	});
	const navigate = useNavigate();
	const { signup, loading } = useSignup();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup({ ...formData });
		navigate("/");
		// console.log(formData);
	};
	return loading ? (
		<Loader />
	) : (
		<>
			<div className='hero bg-base-200 min-h-screen'>
				<div className='hero-content flex-col lg:flex-row-reverse'>
					<div className='text-center lg:text-left'>
						<h1 className='text-5xl font-bold'>SignUp now!</h1>
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
									<span className='label-text'>Username</span>
								</label>
								<input
									type='text'
									placeholder='Username'
									className='input input-bordered'
									name='name'
									value={formData.name}
									onChange={handleChange}
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
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Confirm Password</span>
								</label>
								<input
									type='password'
									placeholder='Confirm Password'
									className='input input-bordered'
									required
									name='confirmPassword'
									value={formData.confirmPassword}
									onChange={handleChange}
								/>
							</div>
							<label className='label'>
								<span className='label-text'>Gender</span>
							</label>
							<div className='radio-group flex justify-between  items-center'>
								<span className='label-text'>Male:</span>
								<input
									type='radio'
									name='gender'
									className='radio radio-info'
									onClick={() => setFormData({ ...formData, gender: "Male" })}
									defaultChecked
								/>
								<span className='label-text'>Female:</span>
								<input
									type='radio'
									name='gender'
									className='radio radio-info'
									onClick={() => setFormData({ ...formData, gender: "Female" })}
								/>
							</div>
							<div className='form-control mt-6'>
								<button className='btn btn-primary' type='submit'>
									Signup
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
