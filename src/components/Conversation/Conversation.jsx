/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getUser } from '../../api/UserRequests';

const Conversation = ({ data, currentUserId }) => {
	const [userData, setUserData] = useState(null);

	console.log('data', data);
	useEffect(() => {
		const userId = data.members.find(id => id !== currentUserId);
		const getUserData = async () => {
			try {
				const { data } = await getUser(userId);
				setUserData(data);
				console.log(userData);
			} catch (error) {
				console.log(error);
			}
		};

		getUserData();
	}, []);

	return (
		<div className='bg-gray-[#202c33] flex px-0 py-2 items-center gap-2'>
			<img
				className='w-9 rounded-full'
				src={`https://avatars.dicebear.com/api/initials/${userData?.username}.svg`}
			/>
			<p className='text-gray-300'>{userData?.username}</p>
		</div>
	);
};

export default Conversation;
