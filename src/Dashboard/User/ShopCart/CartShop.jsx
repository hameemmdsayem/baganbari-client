import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartShop = () => {
    // Example state for product items
    const [products, setProducts] = useState([
        { id: 1, name: "AirBrags® Sneakers", size: "2XL", color: "Green", price: 80, quantity: 1, image: "/path/to/sneaker-image.jpg" },
        { id: 2, name: "Luxury Kanzo Shoes", size: "2XL", color: "Green", price: 80, quantity: 1, image: "/path/to/shoe-image.jpg" },
    ]);

    const handleQuantityChange = (id, increment) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, quantity: product.quantity + increment } : product
        ));
    };

    const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <div className="pt-40 px-4 lg:px-20 pb-36">

            <h1 className="text-center text-2xl text-black font-bold px-20">CHECKOUT</h1>
            {/* Product List */}
            <div className="overflow-hidden shadow-md rounded-md">
                <div className="grid grid-cols-4 font-semibold p-4 border-b">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Subtotal</span>
                </div>
                {products.map((product) => (
                    <div key={product.id} className="grid grid-cols-4 items-center p-4 border-b">
                        <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <button className="text-red-500 text-sm mt-2">Remove</button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleQuantityChange(product.id, -1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><FaMinus /></button>
                            <span>{product.quantity}</span>
                            <button onClick={() => handleQuantityChange(product.id, 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><FaPlus /></button>
                        </div>
                        <span>${product.price}</span>
                        <span className="font-semibold">${(product.price * product.quantity)}</span>
                    </div>
                ))}
            </div>

            {/* Coupon and Cart Summary */}
            <div className="mt-8 flex flex-col lg:flex-row gap-8">
                {/* Coupon Input */}
                <div className="lg:w-1/2">
                    <h3 className="font-semibold mb-2">Have a coupon?</h3>
                    <p className="text-sm text-gray-500 mb-4">Add your code for an instant cart discount</p>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Enter coupon code" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none" />
                        <button className="px-4 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#305432]">Apply</button>
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="lg:w-1/2 border rounded-md p-4 shadow-md">
                    <h3 className="font-semibold mb-4">Cart summary</h3>
                    <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="shipping" defaultChecked />
                            Cash On Delivery
                        </label>
                        <span>$0.00</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="shipping" />
                            Online Payment
                        </label>
                        <span>+$15.00</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${total}</span>
                    </div>
                    <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <button className="w-full mt-4 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#366738]">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartShop;
