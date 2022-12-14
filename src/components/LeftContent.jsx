/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import ChatIcon from '../icons/ChatIcon';
import SearchIcon from '../icons/SearchIcon';
import UsersIcon from '../icons/UsersIcon';
import VerticalPoints from '../icons/VerticalPoints';
import Conversation from './Conversation/Conversation';

const LeftContent = ({ chats, setCurrentChat }) => {
	const { auth } = useAuth();
	const [seeUsers, setSeeUsers] = useState(false);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			const respuesta = await axios('http://localhost:4000/api/users/');
			setUsers(respuesta.data);
		};
		getUsers();

		console.log(chats);
	}, []);

	const handleCreateConversation = async idUser => {
		const chatMembers = { senderId: auth._id, receiverId: idUser };

		if (chatMembers.senderId === chatMembers.receiverId) {
			console.log('No puedes crear un chat contigo mismo');
			return;
		}

		console.log(chatMembers.senderId);
		const { data } = await axios.post('http://localhost:4000/api/chat/', {
			senderId: chatMembers.senderId,
			receiverId: chatMembers.receiverId
		});
		console.log(data);
	};

	return (
		<div className='h-full w-[450px] bg-[#111b21] border-gray-900 border-r-[1px] flex flex-col'>
			<div className='h-[60px] px-2 flex justify-between border-gray-900 border-b-[1px] items-center bg-[#202c33]'>
				<div className='w-32 flex justify-start'>
					<img
						className='w-9 rounded-full'
						src={`https://avatars.dicebear.com/api/initials/${auth.username}.svg`}
					/>
				</div>
				<div className='justify-end flex gap-2'>
					{seeUsers ? (
						<button onClick={() => setSeeUsers(false)}>
							<ChatIcon className='w-5 h-5 text-gray-300' />
						</button>
					) : (
						<button onClick={() => setSeeUsers(true)}>
							<UsersIcon className='w-5 h-5 text-gray-300' />
						</button>
					)}

					<VerticalPoints className='w-5 h-5 text-gray-300' />
				</div>
			</div>

			{seeUsers ? (
				<div className=''>
					<div className='relative py-2 flex items-center px-2 border-b-[1px] border-gray-900'>
						<input
							type='text'
							placeholder='Busca o empieza una nueva conversaci??n.'
							className='relative py-2 w-[100%] pr-5 pl-9 text-sm rounded-xl bg-[#202c33] focus:outline-none text-gray-300 flex'
						/>
						<SearchIcon className='absolute top-[18px] left-5 text-gray-300 w-4' />
					</div>

					{users.map(user => {
						return (
							<button
								onClick={() => handleCreateConversation(user._id)}
								key={user._id}
								className='w-full cursor-pointer text-gray-300 border-b-[1px] border-gray-800 py-2 bg-gray-[#202c33] flex px-2 items-center gap-2'
							>
								<img
									className='w-9 rounded-full'
									src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
								/>
								<p>{user.username}</p>
							</button>
						);
					})}
				</div>
			) : (
				<div className=''>
					<div className='relative py-2 flex items-center px-2 border-b-[1px] border-gray-900'>
						<input
							type='text'
							placeholder='Busca un chat.'
							className='relative py-2 w-[100%] pl-9 text-sm rounded-xl bg-[#202c33] focus:outline-none text-gray-300 flex'
						/>
						<SearchIcon className='absolute top-[18px] left-5 text-gray-300 w-4' />
					</div>
					{chats.map((chat, index) => {
						return (
							<div
								onClick={() => setCurrentChat(chat)}
								key={index}
								className='cursor-pointer border-b-[1px] border-gray-800 py-2 bg-gray-[#202c33] flex px-2 items-center gap-2'
							>
								<div>
									<Conversation data={chat} currentUserId={auth._id} />
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default LeftContent;
