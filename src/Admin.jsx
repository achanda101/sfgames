import { useNavigate } from 'react-router-dom'
import { useAuth } from './utils/AuthContext'

const Admin = () => {
    const { user, logoutUser } = useAuth()
    const navigate = useNavigate();

    const logoutClick = () => {
        logoutUser()
        navigate('/login');
    };
    return (

        <div className="px-3">
            <h1>{user.name}, this is your Dashboard.</h1>
            {/* Login Button */}
            <button
                onClick={logoutClick}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
            >
                Logout
            </button>
        </div>

    )
}

export default Admin
