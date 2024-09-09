import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import avatar from "../assets/avatar.png";
import useLogout from "../hooks/useLogout";
import Loader from "./Loader";
import { useAuthContext } from "../context/AuthContext";

const ChatNavbar = ({ selectedConversation }) => {
	const { logout, loading } = useLogout();
	const { user } = useAuthContext();
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "valentine"
	);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.querySelector("html").setAttribute("data-theme", theme);
	}, [theme]);
	return loading ? (
		<Loader />
	) : (
		<div className='flex justify-between w-full items-center sticky top-2 z-10 shadow-2xl shadow-neutral'>
			<label
				htmlFor='my-drawer-2'
				className='btn btn-neutral drawer-button lg:hidden mr-2 w-12 h-12'
			>
				<GiHamburgerMenu className='text-xl' />
			</label>
			<div className='navbar bg-neutral text-neutral-content rounded-lg '>
				<div className='flex-1 gap-6 items-center'>
					{selectedConversation && (
						<img
							src={selectedConversation?.profilePic || avatar}
							alt=''
							className='w-10 rounded-full'
						/>
					)}
					<a className='text-xl '>{selectedConversation?.name || ""}</a>
				</div>

				<div className='dropdown flex-1 '>
					<div tabIndex={0} role='button' className='btn '>
						Theme
						<svg
							width='12px'
							height='12px'
							className='inline-block h-2 w-2 fill-current opacity-60'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 2048 2048'
						>
							<path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className='dropdown-content text-primary bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl'
					>
						<li>
							<input
								type='radio'
								name='theme-dropdown'
								className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
								aria-label='Default'
								value='valentine'
								onChange={(e) => setTheme(e.target.value)}
							/>
						</li>
						<li>
							<input
								type='radio'
								name='theme-dropdown'
								className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
								aria-label='Synthwave'
								value='synthwave'
								onChange={(e) => setTheme(e.target.value)}
							/>
						</li>
						<li>
							<input
								type='radio'
								name='theme-dropdown'
								className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
								aria-label='Cyberpunk'
								value='cyberpunk'
								onChange={(e) => setTheme(e.target.value)}
							/>
						</li>
						<li>
							<input
								type='radio'
								name='theme-dropdown'
								className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
								aria-label='Halloween'
								value='halloween'
								onChange={(e) => setTheme(e.target.value)}
							/>
						</li>
						<li>
							<input
								type='radio'
								name='theme-dropdown'
								className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
								aria-label='Forest'
								value='forest'
								onChange={(e) => setTheme(e.target.value)}
							/>
						</li>
						<li>
							<input
								type='radio'
								name='theme-dropdown'
								className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
								aria-label='Lemonade'
								value='lemonade'
								onChange={(e) => setTheme(e.target.value)}
							/>
						</li>
					</ul>
				</div>

				<div className='flex-none'>
					<div className='dropdown dropdown-end'>
						<div
							tabIndex={1}
							role='button'
							className='btn btn-ghost btn-circle avatar'
						>
							<div className='w-10 rounded-full'>
								<img
									alt='Tailwind CSS Navbar component'
									src={user.user.profilePic}
								/>
							</div>
						</div>

						<ul
							tabIndex={1}
							className='menu menu-sm dropdown-content bg-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow'
						>
							<li>
								<button className='justify-between'>
									Profile
									<span className='badge'>New</span>
								</button>
							</li>

							<li>
								<button>Settings</button>
							</li>
							<li>
								<button
									onClick={async () => {
										await logout();
									}}
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatNavbar;
