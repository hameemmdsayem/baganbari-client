import { useEffect, useState } from "react";
import HelmetHook from "../../../hooks/HelmetHook";
import useAxios from "../../../hooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get("/users")
            .then(data => {
                setUsers(data.data);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                toast.error("Failed to load users");
            });
    }, [axiosInstance]);

    const handleDeleteUser = (id) => {
        axiosInstance.delete(`/users/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("User Deleted");
                    setUsers(users.filter(user => user._id !== id));
                }
            })
            .catch(err => {
                console.error("Error deleting user:", err);
                toast.error("Failed to delete user");
            });
    };

    return (
        <>
            <HelmetHook title={"All Users"} />
            <div className="container mx-auto px-4 py-6">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-3xl font-semibold">All Users</h2>
                    <div className="relative">
                        <input
                            type="text"
                            className="input border border-gray-300 rounded-lg p-2 pr-10"
                            placeholder="Search User"
                        />
                        <button className="absolute right-2 top-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <tr key={user._id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.role}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className='text-red-600 hover:text-red-800'>
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer
                    position="top-center"
                    transition={Zoom}
                    autoClose={1800}
                />
            </div>
        </>
    );
};

export default AllUsers;
