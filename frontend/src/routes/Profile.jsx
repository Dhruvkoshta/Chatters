import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useUpdateUser from "../hooks/useUpdateUser";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Profile = () => {
	const { user } = useAuthContext();
	const [updatedUser, setUpdatedUser] = useState({
		name: "",
		email: "",
		password: "",
		profilePic: "",
	});
	const [updatedPic, setUpdatedPic] = useState([]);
	const { updateUser, loading } = useUpdateUser();

	const handleChange = (e) => {
		setUpdatedUser({ ...updatedUser, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (updatedPic) {
			await updateUser(
				user.user._id,
				updatedUser.name,
				updatedUser.email,
				updatedUser.password,
				updatedPic
			);
		} else {
			await updateUser(
				user.user._id,
				updatedUser.name,
				updatedUser.email,
				updatedUser.password
			);
		}
	};
	return loading ? (
		<Loader />
	) : (
		<div className='bg-neutral-content w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-primary'>
			<aside className='hidden py-4 md:w-1/3 lg:w-1/4 md:block'>
				<div className='sticky flex flex-col gap-2 p-4 text-sm border-r border-neutral top-12'>
					<h2 className='pl-3 mb-4 text-2xl font-semibold'>Settings</h2>

					<a
						href='#'
						className='flex items-center px-3 py-2.5 font-bold bg-neutral-content  text-neutral border border-neutral rounded-full'
					>
						Pubic Profile
					</a>
				</div>
			</aside>
			<main className='w-full min-h-screen py-1 md:w-2/3 lg:w-3/4'>
				<div className='p-2 md:p-4'>
					<div className='w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg'>
						<h2 className='pl-6 text-2xl font-bold sm:text-xl'>
							Public Profile
						</h2>

						<form
							className='grid max-w-2xl mx-auto mt-8'
							onSubmit={handleSubmit}
						>
							<div className='flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0'>
								<img
									className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-primary dark:ring-secondary'
									src={user.user.profilePic}
									alt='Bordered avatar'
								/>

								<div className='flex flex-col space-y-5 sm:ml-8'>
									<input
										type='file'
										className='file-input file-input-bordered w-full max-w-xs'
										name='profilePic'
										onChange={(e) => {
											const reader = new FileReader();
											reader.readAsDataURL(e.target.files[0]);
											reader.onloadend = () => {
												setUpdatedPic(reader.result);
											};
										}}
									/>
								</div>
							</div>

							<div className='items-center mt-8 sm:mt-14 text-primary'>
								<div className='flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6 '>
									<div className='w-full'>
										<label
											htmlFor='name'
											className='block mb-2 text-sm font-medium text-neutral'
										>
											New name
										</label>
										<input
											type='text'
											id='name'
											className='input input-borderedblock w-full p-2.5 '
											placeholder={user.user.name}
											value={updatedUser?.name}
											onChange={handleChange}
										/>
									</div>
								</div>

								<div className='mb-2 sm:mb-6'>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-neutral'
									>
										New email
									</label>
									<input
										type='email'
										id='email'
										className='input input-bordered block w-full p-2.5 '
										placeholder={user.user.email}
										value={updatedUser?.email}
										onChange={handleChange}
									/>
								</div>
								<div className='mb-2 sm:mb-6'>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-neutral'
									>
										New Password
									</label>
									<input
										type='password'
										id='password'
										className='input input-bordered block w-full p-2.5 '
										placeholder='Password'
										value={updatedUser?.password}
										onChange={handleChange}
									/>
								</div>

								<div className='flex justify-between'>
									<Link className='btn btn-primary mr-2' to={"/"}>
										Go Back
									</Link>
									<button type='submit' className='btn btn-primary'>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Profile;
