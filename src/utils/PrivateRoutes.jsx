import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
    const { user } = useAuth(); // Replace with your authentication logic
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
// This code defines a `PrivateRoutes` component that checks if a user is authenticated.
// If the user is authenticated, it renders the child components using `Outlet`.
// If not, it redirects the user to the login page using `Navigate`.