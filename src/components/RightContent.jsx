/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { format } from 'timeago.js';
import { addMessage, getMessages } from '../api/MessageRequests';
import { getUser } from '../api/UserRequests';
import NoSelectedIcon from '../icons/NoSelectedIcon';
import SearchIcon from '../icons/SearchIcon';

const RightContent = ({
	chat,
	currentUser,
	setSendMessage,
	receiveMessage,
	online
}) => {
	const [userData, setUserData] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const scroll = useRef();

	useEffect(() => {
		if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
			setMessages([...messages, receiveMessage]);
		}
	}, [receiveMessage]);

	useEffect(() => {
		const userId = chat?.members?.find(id => id !== currentUser);

		const getUserData = async () => {
			try {
				const { data } = await getUser(userId);
				setUserData(data);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};
		if (chat !== null) getUserData();
	}, [chat, currentUser]);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { data } = await getMessages(chat._id);
				setMessages(data);
			} catch (error) {
				console.log(error);
			}
		};
		if (chat !== null) fetchMessages();
	}, [chat]);

	const handleChange = newMessage => {
		setNewMessage(newMessage);
	};

	const handleSend = async e => {
		try {
			if (e.key === 'Enter') {
				const message = {
					senderId: currentUser,
					text: newMessage,
					chatId: chat._id
				};
				const { data } = await addMessage(message);
				setMessages([...messages, data]);
				setNewMessage('');
			}
		} catch (error) {
			console.log(error);
		}

		const receiverId = chat.members.find(id => id !== currentUser);
		setSendMessage([...messages, receiverId]);
	};

	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className='flex flex-col w-full'>
			<div className='h-[93%] w-[100%] bg-[#0b141a] flex flex-col'>
				{userData ? (
					<>
						<div className='h-[60px] border-b-[1px] border-gray-900 px-5 flex justify-between items-center bg-[#202c33]'>
							<div className=' w-32 flex items-center gap-2 justify-start'>
								<img
									className='w-8 rounded-full'
									src={`https://avatars.dicebear.com/api/initials/${userData?.username}.svg`}
								/>
								<div className='flex flex-col'>
									<p className='text-gray-300'>{userData?.username}</p>
									<p className='text-gray-300 text-[10px]'>
										{online && 'Online'}
									</p>
								</div>
							</div>
							<div className='justify-end flex'>
								<SearchIcon className='w-5 h-5 text-gray-200' />
							</div>
						</div>
					</>
				) : (
					<div className='bg-gray-200 h-full flex flex-col justify-center items-center'>
						<NoSelectedIcon />
						<h1 className='font-thin mt-10 mb-5 text-3xl'>WhatsApp Web</h1>
						<p className='text-gray-400 text-sm'>
							Envía y recibe mensajes sin necesidad de tener tu teléfono
							conectado.
						</p>
						<p className='text-gray-400 text-sm'>
							Usa WhatsApp en hasta 4 dispositivos vinculados y 1 teléfono a la
							vez.
						</p>
					</div>
				)}
				{messages.map(message => {
					return (
						<div
							key={message.text}
							className={
								message.senderId === currentUser
									? 'messageOwnDiv'
									: 'messageDiv'
							}
						>
							<div
								ref={scroll}
								className={
									message.senderId === currentUser ? 'messageOwn' : 'message'
								}
							>
								<span>{message.text}</span>
								<span
									className={
										message.senderId === currentUser
											? 'text-[10px] text-end'
											: 'text-[10px] text-start'
									}
								>
									{format(message.createdAt)}
								</span>
							</div>
						</div>
					);
				})}
			</div>
			{chat && (
				<div className='h-[7%] bg-[#202c33] flex items-center justify-center gap-5'>
					<input
						type='text'
						value={newMessage}
						onKeyDown={handleSend}
						onChange={e => handleChange(e.target.value)}
						className='w-[90%] h-[70%] rounded-xl bg-[#2a3942] px-2 text-sm border-2 border-[#2a3942] text-[#7a8a94] placeholder:font-thin focus:outline-none'
						placeholder='Write something here...'
					/>
				</div>
			)}
		</div>
	);
};

export default RightContent;
