import { useEffect, useState } from "react";
import HelmetHook from "../../../hooks/HelmetHook";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const UserPurchaseHistory = () => {
    const [purchases, setPurchases] = useState([]);
    const axiosInstance = useAxios();
    const { user } = useAuth();

    useEffect(() => {
        axiosInstance.get(`/checkouts/${user?.email}`)
            .then((response) => {
                setPurchases(response.data);
            })
            .catch((error) => console.error("Error fetching purchase history:", error));
    }, [axiosInstance, user]);

    let index = 0;  // Initialize a global index counter

    // Calculate the total price of all products
    const totalPrice = purchases.reduce((total, purchase) => {
        const purchaseTotal = purchase.products.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );
        return total + purchaseTotal;
    }, 0);

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
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Shop Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Total Cost</th>
                                <th className="px-4 py-2">Delivery Address</th>
                                <th className="px-4 py-2">Order Date</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase) =>
                                purchase.products.map((product) => (
                                    <tr key={product._id} className="border-b hover:bg-gray-100">
                                        <td className="px-4 py-2">{++index}</td>
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2">{product.shopName}</td>
                                        <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                                        <td className="px-4 py-2">{product.quantity}</td>
                                        <td className="px-4 py-2">${(product.price * product.quantity).toFixed(2)}</td>
                                        <td className="px-4 py-2">{purchase.address || "No address provided"}</td>
                                        <td className="px-4 py-2">{new Date(purchase.orderDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">Pending</td> {/* Update this field as needed */}
                                    </tr>
                                ))
                            )}
                            <tr>
                                <td className="px-4 py-2 text-left" colSpan={5}>
                                    <strong>Total Price</strong>
                                </td>
                                <td className="px-4 py-2 ">
                                    <strong>${totalPrice.toFixed(2)}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserPurchaseHistory;
