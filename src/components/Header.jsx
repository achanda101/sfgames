import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const Header = ({ currentRoute }) => {
    const navigate = useNavigate();

    const adminClick = () => {
        // Placeholder for admin click functionality
        navigate('/login');
        console.log("Admin icon clicked");
    };

    let pageTitle = "";
    switch (currentRoute) {
        case "/":
            pageTitle = "Quizzes";
            break;
        case "/inclusion":
            pageTitle = "Inclusion and Diversity Quiz";
            break;
        case "/financial":
            pageTitle = "Financial Literacy Quiz";
            break;
        case "/workplace":
            pageTitle = "Workplace Etiquette Quiz";
            break;
        case "/posh":
            pageTitle = "PoSH Quiz";
            break;
        case "/login":
            pageTitle = "";
            break;
        case "/admin":
            pageTitle = "Admin Dashboard";
            break;
        default:
            pageTitle = "";
            break;
    }

    return (
        <header className="bg-white border-2 border-gray-100 rounded-lg p-2 mx-0 my-2">
            <div className="flex items-center justify-between">
                {/* Home Icon - Left */}
                <Link to="/" className="flex-shrink-0">
                    <div className="w-8 h-8 border-2 border-gray-100 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </div>
                </Link>

                {/* Page Title - Center */}
                <div className="flex-1 flex justify-center">
                    <span className="text-lg text-gray-800">{pageTitle}</span>
                </div>
            </div>
        </header>
    );
};
Header.propTypes = {
    currentRoute: PropTypes.string.isRequired,
};


export default Header;