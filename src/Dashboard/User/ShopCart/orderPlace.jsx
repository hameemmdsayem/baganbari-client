import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderPlace = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const totalAmount = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    // Fetch products from cart for order
    useEffect(() => {
        axiosInstance.get(`/carts/${user?.email}`)
            .then(response => {
                console.log("Cart data:", response.data);  // Log cart data to verify response
                setProducts(response.data);
            })
            .catch(error => console.error("Error fetching cart data:", error));
    }, [axiosInstance, user]);

    const handlePlaceOrder = () => {
        const orderData = {
            products: products,
            totalPrice: totalAmount,
            orderDate: new Date(),
            address,
            phone,
            email: user?.email,
        };

        console.log("Order data:", orderData);  // Log order data to verify before posting

        axiosInstance.post('/checkouts', orderData)
            .then(() => {
                console.log('Order posted successfully');
                // Once the order is successfully placed, delete the cart data
                axiosInstance.delete(`/carts/${user?.email}`)
                    .then(() => {
                        setProducts([]);
                        console.log('Cart cleared successfully');
                        toast.success("Order placed successfully!", {
                            autoClose: 1000,
                            onClose: () => navigate('/'),
                        });

                    })
                    .catch(error => {
                        console.error('Error clearing cart:', error);
                        // You can choose to handle the error silently or log it for further debugging
                    });
            })
            .catch(error => {
                console.error('Error posting order data:', error);
                // You can choose to handle the error silently or log it for further debugging
            });
    };

    return (
        <div className="pt-40 px-4 lg:px-20 pb-36">
            <ToastContainer /> {/* Add ToastContainer to display toasts */}

            <h1 className="text-center text-2xl text-black font-bold">ORDER SUMMARY</h1>

            {/* Order Details Table */}
            <div className="overflow-hidden shadow-md rounded-md mt-8">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#2E7D32] text-white">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b">
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">{product.quantity}</td>
                                <td className="p-4">${product.price}</td>
                                <td className="p-4 font-semibold">${(product.price * product.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="font-semibold text-lg">
                            <td className="p-4" colSpan="3">Total</td>
                            <td className="p-4">${totalAmount}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* User Information Card */}
            <div className="mt-8 border rounded-md shadow-md p-6 bg-[#FFF8E1]">
                <h3 className="font-semibold text-lg text-[#2E7D32]">Your Information</h3>
                <p className="mt-4"><strong>Name:</strong> {user?.displayName}</p>
                <p className="mt-2"><strong>Email:</strong> {user?.email}</p>
                <div className="mt-4">
                    <label className="block font-semibold mb-1">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        placeholder="Enter your address"
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-semibold mb-1">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        placeholder="Enter your phone number"
                    />
                </div>
            </div>

            {/* Place Order Button */}
            <button
                onClick={handlePlaceOrder}
                className="mt-8 w-full py-3 bg-[#2E7D32] text-white rounded-md hover:bg-[#305432]"
            >
                Place Order
            </button>
        </div>
    );
};

export default OrderPlace;
