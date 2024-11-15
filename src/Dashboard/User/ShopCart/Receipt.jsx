import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jsPDF } from "jspdf";

const Receipt = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Destructure only if location.state is available
    const { products, totalAmount, address, phone, user } = location.state || {};

    // Redirect to the Order Place page if data is missing
    useEffect(() => {
        if (!location.state) {
            navigate("/orderPlace"); // Update with the correct path to your OrderPlace component
        }
    }, [location, navigate]);

    // Generate and download the PDF receipt
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Order Receipt", 20, 20);

        // User information
        doc.text(`Name: ${user?.displayName}`, 20, 30);
        doc.text(`Email: ${user?.email}`, 20, 40);
        doc.text(`Address: ${address}`, 20, 50);
        doc.text(`Phone: ${phone}`, 20, 60);

        // Order details
        let yPosition = 70;
        doc.text("Products:", 20, yPosition);
        yPosition += 10;

        products.forEach((product) => {
            doc.text(`${product.name} x${product.quantity} - $${(product.price * product.quantity)}`, 20, yPosition);
            yPosition += 10;
        });

        // Total amount
        doc.text(`Total: $${totalAmount}`, 20, yPosition);

        // Save PDF
        doc.save("order_receipt.pdf");
    };

    // Render only if products are available
    if (!products) {
        return null; // Prevents component from rendering if products are not defined
    }

    return (
        <div className="pt-40 px-4 lg:px-20 pb-36">
            <h1 className="text-center text-2xl text-black font-bold">Order Receipt</h1>

            <div className="mt-8 border rounded-md shadow-md p-6 bg-[#FFF8E1]">
                <h3 className="font-semibold text-lg text-[#2E7D32]">Customer Information</h3>
                <p><strong>Name:</strong> {user?.displayName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Phone:</strong> {phone}</p>

                <h3 className="mt-4 font-semibold text-lg text-[#2E7D32]">Order Details</h3>
                {products.map((product) => (
                    <p key={product._id}>{product.name} x{product.quantity} - ${(product.price * product.quantity)}</p>
                ))}

                <p className="font-bold mt-4">Total: ${totalAmount}</p>

                <button
                    onClick={generatePDF}
                    className="mt-8 py-2 px-4 bg-[#2E7D32] text-white rounded-md hover:bg-[#305432]"
                >
                    Download Receipt
                </button>
            </div>
        </div>
    );
};

export default Receipt;
