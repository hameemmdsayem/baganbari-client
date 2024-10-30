import HelmetHook from "../../../hooks/HelmetHook";

const ShopHome = () => {
    // Sample data, replace these values with actual data from your context or props
    const shopInfo = {
        userName: "John Doe",
        shopName: "Green Thumb Plants",
        email: "johndoe@example.com",
        shopDetails: "A vibrant plant shop offering a wide variety of houseplants and garden supplies to bring nature into your home.",
        totalPlants: 56
    };

    return (
        <>
            <HelmetHook title={"Shop Home"} />

            <div className="min-h-screen bg-[#F6FCDF] p-6">
                <h1 className="text-3xl font-bold text-center text-[#859F3D] mb-8">Shop Dashboard</h1>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {/* User Info Section */}
                    <div className="bg-white rounded-lg shadow p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-[#859F3D]">User Information</h2>
                        <p className="text-gray-600"><span className="font-semibold">User Name:</span> {shopInfo.userName}</p>
                        <p className="text-gray-600"><span className="font-semibold">Email:</span> {shopInfo.email}</p>
                    </div>

                    {/* Shop Info Section */}
                    <div className="bg-white rounded-lg shadow p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-[#859F3D]">Shop Information</h2>
                        <p className="text-gray-600"><span className="font-semibold">Shop Name:</span> {shopInfo.shopName}</p>
                        <p className="text-gray-600"><span className="font-semibold">Total Plants:</span> 
                            <span className="ml-2 badge badge-outline text-white bg-[#859F3D] px-4 py-1">
                                {shopInfo.totalPlants}
                            </span>
                        </p>
                    </div>

                    {/* Shop Description Section */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-[#859F3D]">Shop Details</h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">{shopInfo.shopDetails}</p>
                    </div>

                    
                </div>
            </div>
        </>
    );
};

export default ShopHome;
