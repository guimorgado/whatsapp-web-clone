/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
	const [reload, setReload] = useState(true);

	useEffect(() => {
		const authenticateUser = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				setReload(false);
				return;
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			};

			try {
				const { data } = await axios(
					'http://localhost:4000/api/users/account',
					config
				);
				setAuth(data);
			} catch (error) {
				setAuth({});
			}

			setReload(false);
		};
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				setAuth,
				auth,
				reload
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
