import { useState } from "react";
import HelmetHook from "../../../hooks/HelmetHook";

const CreateShop = () => {
    const [showModal, setShowModal] = useState(false);
    const [shopName, setShopName] = useState("");
    const [shopDetails, setShopDetails] = useState("");

    const handleCreateShop = () => {
        // Handle the creation of the shop (e.g., API call)
        console.log("Shop Created:", { shopName, shopDetails });
        // Close the modal after creation
        setShowModal(false);
        // Clear fields
        setShopName("");
        setShopDetails("");
    };

    return (
        <>
            <HelmetHook title={"Create Shop"} />
            <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-screen text-center">
                <h2 className="text-2xl font-semibold mb-4">You don't have any shop.</h2>
                <p className="mb-6">Let's create one!</p>
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
                                onClick={handleCreateShop} 
                                className="px-4 py-2 bg-[#859F3D] text-white rounded-lg hover:bg-[#6f8430] transition">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateShop;
