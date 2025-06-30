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

                {/* Admin Icon - Right */}
                <button onClick={adminClick} className="flex-shrink-0" aria-label="Logout">
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
                                d="M276.941 440.584v565.722c0 422.4 374.174 625.468 674.71 788.668l8.02 4.292 8.131-4.292c300.537-163.2 674.71-366.268 674.71-788.668V440.584l-682.84-321.657L276.94 440.584Zm682.73 1479.529c-9.262 0-18.523-2.372-26.993-6.89l-34.9-18.974C588.095 1726.08 164 1495.906 164 1006.306V404.78c0-21.91 12.65-41.788 32.414-51.162L935.727 5.42c15.134-7.228 32.866-7.228 48 0l739.313 348.2c19.765 9.374 32.414 29.252 32.414 51.162v601.525c0 489.6-424.207 719.774-733.779 887.943l-34.899 18.975c-8.47 4.517-17.731 6.889-27.105 6.889Zm467.158-547.652h-313.412l-91.595-91.482v-83.803H905.041v-116.78h-83.69l-58.503-58.504c-1.92.113-3.84.113-5.76.113-176.075 0-319.285-143.21-319.285-319.285 0-176.075 143.21-319.398 319.285-319.398 176.075 0 319.285 143.323 319.285 319.398 0 1.92 0 3.84-.113 5.647l350.57 350.682v313.412Zm-266.654-112.941h153.713v-153.713L958.462 750.155l3.953-37.27c1.017-123.897-91.595-216.621-205.327-216.621S550.744 588.988 550.744 702.72c0 113.845 92.612 206.344 206.344 206.344l47.21-5.309 63.811 63.7h149.873v116.78h116.781v149.986l25.412 25.299Zm-313.4-553.57c0 46.758-37.949 84.706-84.706 84.706-46.758 0-84.706-37.948-84.706-84.706s37.948-84.706 84.706-84.706c46.757 0 84.706 37.948 84.706 84.706"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </header>
    );
};
Header.propTypes = {
    currentRoute: PropTypes.string.isRequired,
};


export default Header;