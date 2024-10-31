import { useState } from "react";
import HelmetHook from "../hooks/HelmetHook";

const SettingsPage = () => {
    const [userInfo, setUserInfo] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        profilePicture: "https://via.placeholder.com/150",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        setUserInfo((prevState) => ({
            ...prevState,
            profilePicture: e.target.value,
        }));
    };

    const handleSave = () => {
        // Save user info logic (e.g., API call)
        console.log("User info saved:", userInfo);
    };

    return (
        <>
            <HelmetHook title="Settings" />
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-3xl font-semibold mb-6">Profile Settings</h2>
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
                            value={userInfo.profilePicture}
                            onChange={handleProfilePictureChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="w-full mb-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="w-full mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-4 px-4 py-2 bg-[#6F8430] text-white rounded-lg shadow-md hover:bg-[#5d6d2c]"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
