import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

const Login = () => {

    const [show, setShow] = useState(false);
    const axiosInstance = useAxios()

    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate()

    const handleSignIn = e => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                toast.success("Successfully Signed in");

                navigate('/')
            })
            .catch(() => toast.error("Invalid Email / Password"));

        form.reset();
    }

    /*  const handleGoogleLogin = () => {
         googleSignIn()
             .then((result) => {
 
                 const userInfo = {
                     name: result.user.displayName,
                     email: result.user.email,
                     role: "User"
                 }
                 axiosInstance.post('/users', userInfo)
                     .then(res => {
                         if (res.data.insertedId) {
                             toast("Successfully Signed in")
                             navigate('/')
                         }
                     })
             })
             .catch(() => console.log("Error"))
     } */

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: "User"
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

                        // Navigate to the home page regardless of the database operation status
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
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col gap-6">
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl lg:text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full shadow-2xl">
                        <form className="card-body" onSubmit={handleSignIn}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={show ? "text" : "password"}
                                        placeholder="password" className="input input-bordered w-full" name="password" required />
                                    <span className="absolute top-4 right-2 cursor-pointer" onClick={() => setShow(!show)}>
                                        {show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                    </span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-2">
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </div>

                            <div className="mb-4">
                                <button className="btn btn-outline btn-success w-full text-lg" onClick={handleGoogleLogin}><FaGoogle /> Google</button>
                            </div>


                            <p className=" mt-4">Are you new here? Please <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                transition={Zoom}
                autoClose={1800}
            ></ToastContainer>
        </div>
    );
};

export default Login;