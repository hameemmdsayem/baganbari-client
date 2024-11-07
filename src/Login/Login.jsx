import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

const Login = () => {
    const [show, setShow] = useState(false);
    const axiosInstance = useAxios();

    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                toast.success("Successfully Signed in");
                navigate('/');
            })
            .catch(() => toast.error("Invalid Email / Password"));

        form.reset();
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: "user"
                };

                axiosInstance.post('/users', userInfo)
                    .then(res => {
                        if (res.data.exists) {
                            toast.info("User already exists. Signed in successfully.");
                        } else if (res.data.insertedId) {
                            toast.success("Successfully Signed in and user created.");
                        } else {
                            toast.error("Unexpected error during user registration.");
                        }
                        navigate('/');
                    })
                    .catch(() => {
                        toast.error("Error saving user data. Please try again.");
                        navigate('/');
                    });
            })
            .catch((error) => {
                console.error("Google Sign-In Error:", error);
                toast.error("Google Sign-In Failed. Please try again.");
            });
    };

    return (
        <div className="bg-[#F6FCDF] min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-[#4A4A4A] mb-6">Welcome Back!</h1>
                <form className="space-y-6" onSubmit={handleSignIn}>
                    <div>
                        <label className="block text-sm font-medium text-[#4A4A4A]">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#6F8430] transition duration-200"
                            name="email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#4A4A4A]">Password</label>
                        <div className="relative">
                            <input
                                type={show ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#6F8430] transition duration-200"
                                name="password"
                                required
                            />
                            <span className="absolute top-3 right-3 cursor-pointer" onClick={() => setShow(!show)}>
                                {show ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="w-full p-4 bg-[#6F8430] text-white font-semibold rounded-md shadow hover:bg-[#4A6A3D] transition duration-200">Login</button>
                    <button className="w-full p-4 border border-[#6F8430] text-[#6F8430] font-semibold rounded-md flex items-center justify-center hover:bg-[#6F8430] hover:text-white transition duration-200" onClick={handleGoogleLogin}>
                        <FaGoogle className="mr-2" /> Sign in with Google
                    </button>
                    <p className="text-center text-[#4A4A4A]">New here? <Link to="/register" className="text-[#6F8430] hover:underline">Register</Link></p>
                </form>
            </div>
            <ToastContainer position="top-center" transition={Zoom} autoClose={1800} />
        </div>
    );
};

export default Login;
