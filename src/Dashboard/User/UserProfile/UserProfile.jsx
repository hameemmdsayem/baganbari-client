import { useEffect, useState } from "react";
import HelmetHook from "../../../hooks/HelmetHook";

const UserPurchaseHistory = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        // Simulated demo data
        const demoPurchases = [
            {
                _id: "1",
                orderNumber: "PO123456",
                deliveryAddress: "123 Main St, Springfield, USA",
                totalCost: 59.99,
                expectedDelivery: "2024-11-05",
                status: "Shipped"
            },
            {
                _id: "2",
                orderNumber: "PO123457",
                deliveryAddress: "456 Elm St, Springfield, USA",
                totalCost: 79.49,
                expectedDelivery: "2024-11-10",
                status: "Processing"
            },
            {
                _id: "3",
                orderNumber: "PO123458",
                deliveryAddress: "789 Maple Ave, Springfield, USA",
                totalCost: 34.99,
                expectedDelivery: "2024-11-12",
                status: "Delivered"
            }
        ];
        setPurchases(demoPurchases);
    }, []);

    return (
        <>
            <HelmetHook title={"User Purchase History"} />
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-3xl font-semibold mb-4">Purchase History</h2>
                
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Purchase Order</th>
                                <th className="px-4 py-2">Delivery Address</th>
                                <th className="px-4 py-2">Total Cost</th>
                                <th className="px-4 py-2">Expected Delivery</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase, idx) => (
                                <tr key={purchase._id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{purchase.orderNumber}</td>
                                    <td className="px-4 py-2">{purchase.deliveryAddress}</td>
                                    <td className="px-4 py-2">${purchase.totalCost.toFixed(2)}</td>
                                    <td className="px-4 py-2">{purchase.expectedDelivery}</td>
                                    <td className="px-4 py-2">{purchase.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserPurchaseHistory;
