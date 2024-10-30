import HelmetHook from "../../../hooks/HelmetHook";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import this if you need automatic configuration

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SalesReport = () => {
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Current Year',
                data: [20000, 25000, 22000, 27000, 24000],
                borderColor: '#6a0dad', // Dark purple
                fill: false,
            },
            {
                label: 'Previous Year',
                data: [18000, 22000, 21000, 26000, 23000],
                borderColor: '#00b894', // Green
                fill: false,
            },
        ],
    };

    const chartOptions = {
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
            <HelmetHook title="Sales Report" />
            <div className="p-4 min-h-screen bg-[#F6FCDF]">
                <h1 className="text-2xl font-bold text-center mb-6">Sales Report</h1>
                
                {/* Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
                        <p className="text-gray-600">Total Sales</p>
                        <h2 className="text-3xl font-semibold">$340,000</h2>
                        <p className="text-green-500">↑ 12% this year</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
                        <p className="text-gray-600">Total Orders</p>
                        <h2 className="text-3xl font-semibold">45,600</h2>
                        <p className="text-red-500">↓ 8% this year</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
                        <p className="text-gray-600">Total Revenue</p>
                        <h2 className="text-3xl font-semibold">$890,000</h2>
                        <p className="text-green-500">↑ 9% this year</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
                        <p className="text-gray-600">Total Customers</p>
                        <h2 className="text-3xl font-semibold">142,300</h2>
                        <p className="text-green-500">↑ 5% this year</p>
                    </div>
                </div>

                {/* Sales Revenue Chart */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Sales Revenue Trend</h2>
                    <Line data={salesData} options={chartOptions} />
                </div>

                {/* Top Products Table */}
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
                                <td className="py-2 px-4 border-b border-gray-200">Succulent Set</td>
                                <td className="py-2 px-4 border-b border-gray-200">$29.99</td>
                                <td className="py-2 px-4 border-b border-gray-200">Indoor Plants</td>
                                <td className="py-2 px-4 border-b border-gray-200">300</td>
                                <td className="py-2 px-4 border-b border-gray-200">$8,997</td>
                            </tr>
                            {/* Additional table rows as needed */}
                        </tbody>
                    </table>
                </div>

                {/* Monthly Target Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">Monthly Sales Target</h2>
                    {/* Insert Progress Circle or use a placeholder here */}
                    <p className="text-gray-600 mt-4">Target: $100k | Achieved: $85k | Today: $3.5k</p>
                </div>
            </div>
        </>
    );
};

export default SalesReport;
