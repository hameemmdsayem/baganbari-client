import HelmetHook from "../../../hooks/HelmetHook";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaStore, FaSeedling, FaUsers, FaChartBar, FaShoppingCart, FaUserPlus } from 'react-icons/fa';
import 'chart.js/auto'; // Import this if you need automatic configuration

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Admin = () => {
    const totalUsersData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Current Week',
                data: [10, 15, 13, 20, 18],
                borderColor: '#6a0dad', // Dark purple
                fill: false,
            },
            {
                label: 'Previous Week',
                data: [12, 9, 16, 14, 15],
                borderColor: '#00b894', // Green
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
            <div className="p-4 min-h-screen bg-[#F6FCDF]">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Metric Cards */}
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
                        <p className="text-gray-600">Total Sales</p>
                        <h2 className="text-3xl font-semibold">$34,456</h2>
                        <p className="text-green-500">↑ 14% in the last month</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
                        <p className="text-gray-600">Total Orders</p>
                        <h2 className="text-3xl font-semibold">3,456</h2>
                        <p className="text-red-500">↓ 17% in the last month</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
                        <p className="text-gray-600">Total Revenue</p>
                        <h2 className="text-3xl font-semibold">$1,456</h2>
                        <p className="text-green-500">↑ 14% in the last month</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
                        <p className="text-gray-600">Total Customers</p>
                        <h2 className="text-3xl font-semibold">42,456</h2>
                        <p className="text-red-500">↓ 11% in the last month</p>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Revenue</h2>
                    <Line data={totalUsersData} options={options} />
                </div>

                {/* Top Selling Products Table */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200">Product Name</th>
                                <th className="py-2 px-4 border-b border-gray-200">Price</th>
                                <th className="py-2 px-4 border-b border-gray-200">Category</th>
                                <th className="py-2 px-4 border-b border-gray-200">Quantity</th>
                                <th className="py-2 px-4 border-b border-gray-200">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-200">T-Shirt</td>
                                <td className="py-2 px-4 border-b border-gray-200">$76.89</td>
                                <td className="py-2 px-4 border-b border-gray-200">Women Clothes</td>
                                <td className="py-2 px-4 border-b border-gray-200">128</td>
                                <td className="py-2 px-4 border-b border-gray-200">$6,647.15</td>
                            </tr>
                            {/* Repeat table rows as needed */}
                        </tbody>
                    </table>
                </div>

                {/* Monthly Target Progress Circle */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">Monthly Target</h2>
                    {/* Insert Progress Circle here with react-circular-progressbar */}
                    <p className="text-gray-600 mt-4">Target: $25k | Revenue: $18k | Today: $1.8k</p>
                </div>
            </div>
        </>
    );
};

export default Admin;
