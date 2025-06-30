import { useContext, useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        checkUserStatus();
    }, [])

    const loginUser = async (userInfo) => {
        setLoading(true);
        try {
            let response = await account.createEmailPasswordSession(userInfo.email, userInfo.password);
            let accountDetails = await account.get();
            setUser(accountDetails);
            toast.success('Login successful!', { position: "bottom-right" });
        } catch (error) {
            if (error && error.code) {
                if (error.code === 401) {
                    toast.error('Invalid credentials. Please check your email and password.', { position: "bottom-right" });
                } else if (error.code === 429) {
                    toast.error('Too many requests. Please try again later.', { position: "bottom-right" });
                } else if (error.code === 503) {
                    toast.error('Service unavailable. Please try again later.', { position: "bottom-right" });
                } else {
                    toast.error(`Authentication error (${error.code}): ${error.message}`, { position: "bottom-right" });
                }
            } else {
                toast.error(`Unexpected error: ${error.message || error}`, { position: "bottom-right" });
            }
        }
        setLoading(false);
    }
    const logoutUser = async () => {
        try {
            const activeSessions = await account.listSessions();
            if (activeSessions.total > 0) {
                await account.deleteSession("current")
            }
        } catch (error) {
            console.log("No session available.");
        }
        setUser(null);
    }
    const registerUser = async (userInfo) => {
        setLoading(true);
        try {
            await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password1,
                userInfo.name,
                {
                    checkInTime: userInfo.checkInTime || null,
                    checkOutTime: userInfo.checkOutTime || null,
                    checkInStatus: userInfo.checkInStatus || false
                });
            // Create a session after registration
            await account.createEmailPasswordSession(userInfo.email, userInfo.password1);
            let accountDetails = await account.get();
            setUser(accountDetails);
            toast.success('Registration successful!', { position: "bottom-right" });
            navigate('/admin');
        } catch (error) {
            if (error && error.code) {
                if (error.code === 400) {
                    toast.error('Invalid request. Please check your input.', { position: "bottom-right" });
                } else if (error.code === 409) {
                    toast.error('Email already in use. Please use a different email.', { position: "bottom-right" });
                } else if (error.code === 429) {
                    toast.error('Too many requests. Please try again later.', { position: "bottom-right" });
                } else if (error.code === 503) {
                    toast.error('Service unavailable. Please try again later.', { position: "bottom-right" });
                } else {
                    alert(`Registration error (${error.code}): ${error.message}`);
                    // toast.error(`Registration error (${error.code}): ${error.message}`, { position: "bottom-right" });
                }
            }
        }
        setLoading(false);
    }
    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            setUser(null);
            // if (error && error.code === 401) {
            //     toast.error('Session expired. Please log in again.', { position: "bottom-right" });
            // }
        }
        setLoading(false);
    }

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus
    }

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner-dual"></div>
                    <p style={{ textAlign: "center" }}>Loading...</p>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider >
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthContext;

// This code defines an `AuthContext` using React's Context API.
// The `AuthProvider` component manages the authentication state and provides methods for login, logout, and registration.
// It also includes a loading state to show a spinner while the authentication status is being checked.
// The `useAuth` hook allows other components to access the authentication context easily.
// The `AuthProvider` wraps the application, and the `useAuth` hook can be used in any component to access the authentication state and methods.
// The `loading` state is set to `false` after the initial check, and a spinner is displayed while loading.
// The `loginUser`, `logoutUser`, `registerUser`, and `checkUserStatus` functions are placeholders and should be implemented with actual logic for handling authentication.
// The `user` state holds the current user's information, and it is initially set to `null`.
// The `contextData` object contains the user state and authentication methods, which are passed to the `AuthContext.Provider`.
