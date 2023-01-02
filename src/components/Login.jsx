import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import WhatsappIcon from '../icons/whatsappIcon';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const { setAuth, auth } = useAuth();

	if (auth._id) {
		return <Navigate to='/home' />;
	}

	const handleSubmit = async e => {
		e.preventDefault();

		if ([username, password].includes('')) {
			console.log('All fields are required');
			return;
		}

		try {
			const { data } = await axios.post(
				'http://localhost:4000/api/users/login',
				{
					username,
					password
				}
			);
			setAuth(data);
			navigate('/home');
			localStorage.setItem('token', data.token);
		} catch (error) {
			console.log(error);
		}
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
			<div className='h-24 flex bg-[#00a884] justify-center items-start'>
				<div className='w-[600px] flex justify-center bg-white p-10 flex flex-col gap-5 justify-center'>
					<h1 className='text-center text-2xl font-normal'>Haz Login</h1>
					<h1 className='text-xl font-thin'>Enter your username:</h1>
					<input
						value={username}
						onChange={e => setUsername(e.target.value)}
						type='text'
						className='border-[1px] border-gray-200 px-2 placeholder:text-sm rounded-lg py-1'
						placeholder='guilherme'
					/>
					<h1 className='text-xl font-thin'>Enter your password:</h1>
					<input
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
						className='border-[1px] border-gray-200 px-2 placeholder:text-sm rounded-lg py-1'
						placeholder='write...'
					/>
					<button
						onClick={handleSubmit}
						className='py-2 px-2 text-white rounded-xl bg-[#00a884]'
					>
						Sign In
					</button>
					<a href='/' className='text-sm'>
						Don&apos;t have an account? Register
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
