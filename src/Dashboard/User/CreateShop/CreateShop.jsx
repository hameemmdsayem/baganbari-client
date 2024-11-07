import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import HelmetHook from "../../../hooks/HelmetHook";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const CreateShop = () => {
    const [showModal, setShowModal] = useState(false);
    const [shopName, setShopName] = useState("");
    const [shopDetails, setShopDetails] = useState("");
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const handleCreateShop = async (email) => {
        const shopData = {
            name: shopName,
            shopDetails: shopDetails,
            creatorName: user.displayName,
            status: "active",
        };

        try {
            // Send requests to create the shop and update user role
            await axiosInstance.post("/shops", shopData);
            await axiosInstance.patch(`/users/role/owner/${email}`);

            // Display success toast
            toast.success("Shop successfully created!");

            // Clear input fields and close modal
            setShopName("");
            setShopDetails("");
            setShowModal(false);

            // Redirect after a short delay
            setTimeout(() => {
                navigate("/dashboard/shop-home");
            }, 2000); // 2-second delay for the toast message to display

        } catch (error) {
            console.error("Error creating shop:", error);
            toast.error("Failed to create shop. Please try again.");
        }
    };

    return (
        <>
            <HelmetHook title={"Create Shop"} />
            <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-screen text-center">
                <h2 className="text-2xl font-semibold mb-4">You don&apos;t have any shop.</h2>
                <p className="mb-6">Let&apos;s create one!</p>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#859F3D] text-white px-6 py-3 rounded-lg hover:bg-[#6f8430] transition">
                    Create Shop
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Create a New Shop</h3>
                        <input
                            type="text"
                            placeholder="Shop Name"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            className="input input-bordered w-full mb-4 border-[#6f8430] focus:border-[#6f8430]"
                        />
                        <textarea
                            placeholder="Shop Details"
                            value={shopDetails}
                            onChange={(e) => setShopDetails(e.target.value)}
                            className="textarea textarea-bordered w-full mb-4 border-[#6f8430] focus:border-[#6f8430]"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                            <button
                                onClick={() => handleCreateShop(user.email)}
                                className="px-4 py-2 bg-[#859F3D] text-white rounded-lg hover:bg-[#6f8430] transition">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateShop;
