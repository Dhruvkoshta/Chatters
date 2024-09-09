import React from "react";
import DrawerItem from "./DrawerItem";
import DrawerNavbar from "./DrawerNavbar";
import useGetConversations from "../hooks/useGetConversations";
import Loader from "./Loader";

const Drawer = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className='drawer-side z-50'>
			<label
				htmlFor='my-drawer-2'
				aria-label='close sidebar'
				className='drawer-overlay'
			></label>
			<ul className=' bg-base-200 text-base-content min-h-full w-80 p-4 overflow-auto'>
				<DrawerNavbar />
				<div className='divider'></div>
				{loading ? (
					<Loader />
				) : (
					conversations.map((conversation) => (
						<DrawerItem key={conversation._id} conversation={conversation} />
					))
				)}
			</ul>
		</div>
	);
};

export default Drawer;
