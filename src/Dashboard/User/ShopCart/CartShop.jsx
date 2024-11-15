import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const CartShop = () => {
    const { user, loader } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    // State for product items, coupon, and discount
    const [products, setProducts] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0); // Discount percentage

    // Handle quantity change for a specific product
    const handleQuantityChange = (productId, increment) => {
        setProducts(products.map(product => {
            if (product._id === productId) {
                const updatedQuantity = Math.max(product.quantity + increment, 0); // Prevent negative quantities
                return { ...product, quantity: updatedQuantity };
            }
            return product;
        }));
    };

    // Calculate total price before and after discount
    const totalBeforeDiscount = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const totalAfterDiscount = totalBeforeDiscount * (1 - discount / 100);

    // Fetch products from server
    useEffect(() => {
        axiosInstance.get(`/carts/${user?.email}`)
            .then(data => setProducts(data.data))
            .catch(error => console.error('Error fetching cart data:', error));
    }, [axiosInstance, user]);

    // Handle product removal
    const handleRemove = (productId) => {
        axiosInstance.delete(`/carts/${user?.email}/${productId}`)
            .then(() => {
                // Remove product from local state after successful deletion
                setProducts(products.filter(product => product._id !== productId));

            })
            .catch(error => console.error('Error removing product from cart:', error));
    };

    // Apply coupon code
    const applyCoupon = () => {
        if (couponCode === "winter2024") {
            setDiscount(25); // 25% discount
        } else {
            alert("Invalid coupon code");
            setDiscount(0); // Reset discount if invalid
        }
    };

    // Handle checkout and clear cart
    const handleCheckout = () => {
        // Just navigate to the orderPlace page, don't clear the cart yet
        navigate("/orderPlace");
    };


    return (
        <div className="pt-40 px-4 lg:px-20 pb-36">
            <h1 className="text-center text-2xl text-black font-bold px-20">CHECKOUT</h1>

            {/* Product List */}
            <div className="overflow-hidden shadow-md rounded-md">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 font-semibold p-4 border-b">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Subtotal</span>
                </div>

                {loader ? (
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <>
                        {products.map((product) => (
                            <div key={product._id} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center p-4 border-b">
                                <div className="flex items-center gap-4">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                                    <div>
                                        <p className="font-medium">{product.name}</p>
                                        <button
                                            onClick={() => handleRemove(product._id)}
                                            className="text-red-500 text-sm mt-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleQuantityChange(product._id, -1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><FaMinus /></button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => handleQuantityChange(product._id, 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><FaPlus /></button>
                                </div>
                                <span>${product.price}</span>
                                <span className="font-semibold">${(product.price * product.quantity)}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Coupon and Cart Summary */}
            <div className="mt-8 flex flex-col md:flex-row gap-8">
                {/* Coupon Input */}
                <div className="w-full md:w-1/2">
                    <h3 className="font-semibold mb-2">Have a coupon?</h3>
                    <p className="text-sm text-gray-500 mb-4">Add your code for an instant cart discount</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button onClick={applyCoupon} className="px-4 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#305432]">Apply</button>
                    </div>
                    {discount > 0 && (
                        <p className="text-green-600 mt-2">Coupon applied! You saved {discount}% on your total.</p>
                    )}
                </div>

                {/* Cart Summary */}
                <div className="w-full md:w-1/2 border rounded-md p-4 shadow-md">
                    <h3 className="font-semibold mb-4">Cart summary</h3>

                    <div className="flex items-center justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${totalBeforeDiscount}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span>Discount</span>
                        <span>- ${((totalBeforeDiscount * discount) / 100)}</span>
                    </div>
                    <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${totalAfterDiscount}</span>
                    </div>
                    <button onClick={handleCheckout} className="w-full mt-4 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#366738]">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartShop;
