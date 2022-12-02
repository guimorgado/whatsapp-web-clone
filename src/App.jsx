import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoutes from './layouts/ProtectedRoutes';

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route path='/' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route element={<ProtectedRoutes />}>
							<Route path='/home' element={<Home />} />
						</Route>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;
