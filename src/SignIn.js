import axios from "axios";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "./Context";

const SignIn = ({ setShowLogin }) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { setLoggedIn } = useContext(ThemeContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if(email === "" || password === "") {
            toast.error("Please enter all fields");
            return;
        }
        else {
            const res = await axios.post("https://bmf-backend.onrender.com/api/v1/auth/login", {
                email,
                password
            }, { withCredentials: true });
            if(res.data.success) {
                toast.success(res.data.message);
                setLoggedIn(true);
                setTimeout(() => {
                    navigate("/flight-search");
                }, 500);
            } else {
                toast.error(res.data.message);
            }
        }
    }

    return (
        <div className="flex items-center justify-center flex-1 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                >
                Sign In
                </button>
            </form>
            <p onClick={() => setShowLogin(false)} className="text-base mt-4 cursor-pointer text-gray-800">Don't have an account? <span className="text-blue-500">Sign Up</span></p>
            </div>
        </div>
    );
};

export default SignIn;
