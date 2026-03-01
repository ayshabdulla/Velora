import { Navigate } from 'react-router-dom';
import { useAuthcontext } from '../Context/Authcontext';



const AdminRoute = ({ children }) => {
    const { admin, loading } = useAuthcontext();

    if (loading) return <div>Loading...</div>; // Wait for localStorage check

    // If no admin token, redirect to Admin Login
    return admin ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;