import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useConversationContext } from "../context/ConversationContext";
import useGetConversations from "../hooks/useGetConversations";
import toast from "react-hot-toast";

const DrawerNavbar = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversationContext();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			toast.error("Search term too short");
			return;
		}
		const filteredConversations = conversations.find((conversation) =>
			conversation.name.toLowerCase().includes(search.toLowerCase())
		);
		if (filteredConversations) {
			setSelectedConversation(filteredConversations);
			setSearch("");
		} else {
			toast.error("No User found");
		}
	};
	return (
		<form
			className='navbar bg-base-100 '
			style={{ borderRadius: "30px" }}
			onSubmit={handleSubmit}
		>
			<div className='flex-none gap-4'>
				<div className='form-control'>
					<input
						type='text'
						placeholder='Search'
						className='input input-bordered  md:w-auto'
						name='search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div
					type='submit'
					className='flex items-center justify-center border-base-content rounded-full p-2 cursor-pointer hover:bg-neutral hover:text-white'
				>
					<FaSearch />
				</div>
			</div>
		</form>
	);
};

export default DrawerNavbar;

{
	/* <div className='dropdown dropdown-end'>
	<div
		tabIndex={0}
		role='button'
		className='btn btn-ghost btn-circle avatar'
	>
		<div className='w-10 rounded-full'>
			<img
				alt='Tailwind CSS Navbar component'
				src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
			/>
		</div>
	</div>
	<ul
		tabIndex={0}
		className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
	>
		<li>
			<a className='justify-between'>
				Profile
				<span className='badge'>New</span>
			</a>
		</li>
		<li>
			<a>Settings</a>
		</li>
		<li>
			<a>Logout</a>
		</li>
	</ul>
</div> */
}
