import HelmetHook from "../../../hooks/HelmetHook";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaStore, FaSeedling, FaUsers, FaChartBar, FaShoppingCart, FaUserPlus } from 'react-icons/fa';
import 'chart.js/auto';
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Admin = () => {
    const axiosInstance = useAxios();
    const [orderDetails, setOrderDetails] = useState([]);
    const [totalPurchasedProducts, setTotalPurchasedProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        axiosInstance.get('/checkouts')
        .then((response) => {
            const orders = response.data || [];
            setOrderDetails(orders);

            // Calculate total sales and total purchased product count
            const totalSalesAmount = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
            const productCount = orders.reduce((acc, order) => acc + (order.products ? order.products.length : 0), 0);

            setTotalSales(totalSalesAmount);
            setTotalPurchasedProducts(productCount);
        })
        .catch((error) => {
            console.error('Error fetching order details:', error);
        });
    }, [axiosInstance]);

    const totalUsersData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Current Week',
                data: [10, 15, 13, 20, 18],
                borderColor: '#2E86C1',
                fill: false,
            },
            {
                label: 'Previous Week',
                data: [12, 9, 16, 14, 15],
                borderColor: '#28B463',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <>
            <HelmetHook title={'Admin Home'} />
            <div className="p-4 min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h1>
                
                {/* Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="card bg-blue-500 text-white shadow-lg">
                        <div className="card-body">
                            <FaChartBar size={32} className="mb-4" />
                            <h2 className="card-title">Total Sales</h2>
                            <p className="text-2xl">${totalSales.toFixed(2)}</p>
                            <p className="text-green-200">↑ 14% in the last month</p>
                        </div>
                    </div>
                    <div className="card bg-green-500 text-white shadow-lg">
                        <div className="card-body">
                            <FaShoppingCart size={32} className="mb-4" />
                            <h2 className="card-title">Total Purchased Products</h2>
                            <p className="text-2xl">{totalPurchasedProducts}</p>
                            <p className="text-red-200">↓ 17% in the last month</p>
                        </div>
                    </div>
                    <div className="card bg-yellow-500 text-white shadow-lg">
                        <div className="card-body">
                            <FaStore size={32} className="mb-4" />
                            <h2 className="card-title">Total Revenue</h2>
                            <p className="text-2xl">$1,456</p>
                            <p className="text-green-200">↑ 14% in the last month</p>
                        </div>
                    </div>
                    <div className="card bg-red-500 text-white shadow-lg">
                        <div className="card-body">
                            <FaUsers size={32} className="mb-4" />
                            <h2 className="card-title">Total Customers</h2>
                            <p className="text-2xl">42,456</p>
                            <p className="text-red-200">↓ 11% in the last month</p>
                        </div>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="card bg-white shadow-md rounded-lg p-6 mb-10">
                    <h2 className="card-title mb-4">Revenue</h2>
                    <Line data={totalUsersData} options={options} />
                </div>

                {/* Top Selling Products Table */}
                <div className="card bg-white shadow-md rounded-lg p-6 mb-10">
                    <h2 className="card-title mb-4">Top Selling Products</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.flatMap(order => order.products || []).map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.shopName}</td>
                                        <td>{product.quantity}</td>
                                        <td>${(product.price * product.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
