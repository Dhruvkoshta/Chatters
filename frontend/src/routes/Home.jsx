import React from "react";
import ChatRoom from "../components/Chat/ChatRoom";
import Drawer from "../components/Drawer/Drawer";
import { ConversationContextProvider } from "../context/ConversationContext";
const Home = () => {
	return (
		<>
			<ConversationContextProvider>
				<div className='drawer lg:drawer-open'>
					<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
					<div className='drawer-content flex flex-col items-start justify-start m-2'>
						{/* Page content here */}
						<ChatRoom />
					</div>

					{/* DRAWER */}
					<Drawer />
				</div>
			</ConversationContextProvider>
		</>
	);
};

export default Home;
