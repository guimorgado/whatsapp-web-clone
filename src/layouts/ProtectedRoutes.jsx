import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoutes = () => {
	const { auth, reload } = useAuth();

	if (reload) return 'Reloading...';

	return <div>{auth._id ? <Outlet /> : <Navigate to='/Login' />}</div>;
};

export default ProtectedRoutes;
