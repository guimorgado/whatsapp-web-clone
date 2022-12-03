import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { userChats } from '../api/ChatRequests';
import useAuth from '../hooks/useAuth';
import WhatsappIcon from '../icons/whatsappIcon';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

const Home = () => {
	const { auth } = useAuth();
	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [sendMessage, setSendMessage] = useState(null);
	const [receivedMessage, setReceivedMessage] = useState(null);
	const socket = useRef();

	// Connect to Socket.io
	useEffect(() => {
		socket.current = io('ws://localhost:8800');
		socket.current.emit('new-user-add', auth._id);
		socket.current.on('get-users', users => {
			setOnlineUsers(users);
		});
	}, [auth]);

	// Send Message to socket server
	useEffect(() => {
		if (sendMessage !== null) {
			socket.current.emit('send-message', sendMessage);
		}
	}, [sendMessage]);

	// Get the message from socket server
	useEffect(() => {
		socket.current.on('recieve-message', data => {
			console.log(data);
			setReceivedMessage(data);
		});
	}, []);

	useEffect(() => {
		const getChats = async () => {
			try {
				const { data } = await userChats(auth._id);
				setChats(data);
			} catch (error) {
				console.log(error);
			}
		};
		getChats();
	});

	const checkOnlineStatus = chat => {
		const chatMember = chat?.members?.find(member => member !== auth._id);
		const online = onlineUsers.find(user => user.userId === chatMember);
		return online;
	};

	return (
		<div className='h-screen w-full bg-[#111b21]'>
			<div className='flex items-center bg-[#00a884] h-24'>
				<div className='container mx-auto'>
					<div className='flex items-center gap-2'>
						<WhatsappIcon />
						<p className='text-white font-bold text-sm'>WHATSAPP WEB</p>
					</div>
				</div>
			</div>
			<div className='max-w-[1280px] bg-[#111b21] h-[85%] mx-auto'>
				<div className='w-full h-full flex bg-[#222e35]'>
					<LeftContent chats={chats} setCurrentChat={setCurrentChat} />
					<RightContent
						chat={currentChat}
						online={checkOnlineStatus(currentChat)}
						currentUser={auth._id}
						setSendMessage={setSendMessage}
						receivedMessage={receivedMessage}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
