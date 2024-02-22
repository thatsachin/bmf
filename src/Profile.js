import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const Profile = () => {
    
    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo() {
        const res = await axios.get("http://localhost:8000/api/v1/auth/get-user-data", { withCredentials: true });
        if(res.data.success) {
            setFullName(res.data.fullName);
            setEmail(res.data.email);
        } else {
            toast.error(res.data.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(email === "" || password === "" || fullName === "") {
            toast.error("Please enter all fields");
            return;
        }
        else {
            const res = await axios.post("http://localhost:8000/api/v1/auth/update-profile-data", {
                fullName,
                email,
                password
            }, { withCredentials: true });
            if(res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }
    }
    
    return (
    <div className="flex-1 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
    }
  
  export default Profile;