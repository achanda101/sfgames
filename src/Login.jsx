import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './utils/AuthContext'
import DOMPurify from 'dompurify'

const Login = () => {
    const navigate = useNavigate()
    const { user, loginUser } = useAuth()

    const loginForm = useRef(null)

    useEffect(() => {
        if (user) {
            navigate('/admin')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = DOMPurify.sanitize(loginForm.current.email.value)
        const password = DOMPurify.sanitize(loginForm.current.password.value)
        const userInfo = {
            email,
            password
        }
        loginUser(userInfo)
    }

    const registerClick = () => {
        navigate('/register');
    };

    return (
        <div className="bg-gray-50 flex justify-center px-4 py-6">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-10 min-h-fit pt-10 pb-7">
                {/* Header */}
                <div className="flex items-center justify-center mb-4">
                    <img src="/sf-logo.png" alt="SF Logo" className="h-16 inline" />
                    <span className="text-xl font-medium text-gray-900 ml-4">
                        Solidarity Foundation<br />Quizzes
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Admin Login
                </h1>

                {/* Form */}
                <form className="space-y-6" ref={loginForm} onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        value="login"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
