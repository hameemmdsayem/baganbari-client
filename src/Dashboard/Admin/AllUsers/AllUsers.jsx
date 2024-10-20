import { useEffect, useState } from "react";
import HelmetHook from "../../../hooks/HelmetHook";
import useAxios from "../../../hooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AllUsers = () => {
    const [users, setUsers] = useState([])
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get("/users")
            .then(data => {
                setUsers(data.data)
            })
    }, [axiosInstance])

    const handleDeleteUser = (id) => {
        axiosInstance.delete(`/users/${id}`)
        .then(res =>{
            if(res.data.deletedCount > 0){
                toast.success("User Deleted");

                setUsers(users.filter(user => user._id !== id));
            }
        })
    }


    return (
        <>
            <HelmetHook title={"All Users"}></HelmetHook>

            <div>
                <div className='flex justify-evenly my-4'>
                    <h2 className="text-3xl">All Users</h2>

                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search User" />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </button>
                    </label>
                </div>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) => <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className='btn btn-ghost'>
                                            <FaTrashAlt className='text-red-600'></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                <ToastContainer
                    position="top-center"
                    transition={Zoom}
                    autoClose={1800}
                ></ToastContainer>
            </div>
        </>
    );
};

export default AllUsers;