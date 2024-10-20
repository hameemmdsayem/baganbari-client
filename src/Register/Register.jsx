import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxios from "../hooks/useAxios";

const Register = () => {

    const [show, setShow] = useState(false)

    const { createUser, updateUser, logOut } = useAuth();
    const axiosInstance = useAxios();

    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            toast.error('Password should be atleast 6 characters');
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUser(name)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            role: 'User'
                        }

                        axiosInstance.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success("Registration Successful");
                                    logOut();
                                    navigate("/login")
                                }
                            })

                    })
            })

            .catch((err) => {
                console.log(err);
                toast.error(err)
            })

        form.reset();

    }

    return (
        <div>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col gap-6">
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl lg:text-4xl font-bold">Register now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full shadow-2xl">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" name="name" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={show ? "text" : "password"} placeholder="password" className="input input-bordered w-full" name="password" />

                                    <span className="absolute top-4 right-2 cursor-pointer" onClick={() => setShow(!show)}>
                                        {show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Register" className="btn btn-primary" />
                            </div>

                            <p className=" mt-4">Already have an account? Please <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
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

export default Register;