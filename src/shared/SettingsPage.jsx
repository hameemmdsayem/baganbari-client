import { useEffect, useState } from "react";
import HelmetHook from "../hooks/HelmetHook";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const SettingsPage = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        axiosInstance.get(`/users/${user.email}`)
            .then((data) => {
                setUserInfo(data.data);
            });
    }, [axiosInstance, user]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        axiosInstance.patch(`/users/${user.email}`, {
            profilePicture: userInfo.profilePicture,
            name: userInfo.name,
        })
        .then((response) => {
            console.log("Profile updated:", response.data);
        })
        .catch((error) => {
            console.error("Error updating profile:", error);
        });

        e.target.reset()
    };

    return (
        <>
            <HelmetHook title="Settings" />
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-3xl font-semibold mb-6">Profile Settings</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
                        <img
                            src={userInfo.profilePicture}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover mb-4"
                        />
                        <div className="w-full mb-4">
                            <label className="block mb-1">Profile Picture URL</label>
                            <input
                                type="text"
                                name="profilePicture"
                                value={userInfo.profilePicture || ''}
                                onChange={(e) => setUserInfo({ ...userInfo, profilePicture: e.target.value })}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label className="block mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name || ''}
                                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email || ''}
                                readOnly
                                className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <input
                            className="mt-4 px-4 py-2 bg-[#6F8430] text-white rounded-lg shadow-md hover:bg-[#5d6d2c] cursor-pointer"
                            type="submit"
                            value="Save Changes!"
                        />

                        
                    </div>
                </form>
            </div>
        </>
    );
};

export default SettingsPage;
