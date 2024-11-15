import { useEffect, useState } from "react";
import HelmetHook from "../../../hooks/HelmetHook";
import { FaTrash, FaPen } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const AllProducts = () => {



    const axiosIntence = useAxios();
    const [shopData, setShopData] = useState([]);
    const { user, loader } = useAuth();


    const [info, setInfo] = useState([]);

    const axiosInstance = useAxios();
    useEffect(() => {
        axiosInstance.get(`/shops/creatorName/${user.displayName}`)
            .then((data) => {
                setInfo(data.data)
            })
    }, [axiosInstance, user.displayName])

    useEffect(() => {
        axiosIntence.get(`/allplants/shopName/${info.name}`)
            .then(data => setShopData(data.data))

    }, [axiosIntence, info])


    // const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);


    const handleDeleteProduct = () => {
        axiosInstance.delete(`/allplants/${currentProduct}`)
        setShopData(shopData.filter(product => product._id !== currentProduct._id));
        setShowDeleteModal(false);
    };

    const openDeleteModal = (product) => {
        setCurrentProduct(product);
        setShowDeleteModal(true);
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setShowEditModal(true);
    };

    const handleEditProduct = (e) => {
        e.preventDefault();
        
        axiosInstance.patch(`/allplants/${currentProduct._id}`, currentProduct)
            
                setShowEditModal(false);
        
    };

    const handleAddProduct = () => {

        const productInfo = {
            name: currentProduct.name,
            description: currentProduct.description,
            price: currentProduct.price,
            image: currentProduct.image,
            category: currentProduct.category,
            careInstruction: currentProduct.careInstruction,
            shopName: info.name
        }

        axiosInstance.post("/allplants", productInfo)


        setShowAddModal(false);
    };


    return (
        <>
            <HelmetHook title="All Products" />

            <div>
                {
                    loader ? (
                        <div className="mt-12 text-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) :
                        <div className="container mx-auto px-4 py-6">
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className="text-3xl font-semibold">All Products</h2>
                                <button onClick={() => setShowAddModal(true)} className="bg-[#859F3D] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#6f8430]">
                                    Add Plant
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="text-left px-4 py-2">#</th>
                                            <th className="text-left px-4 py-2">Image</th>
                                            <th className="text-left px-4 py-2">Name</th>
                                            <th className="text-left px-4 py-2">Description</th>
                                            <th className="text-left px-4 py-2">Price</th>
                                            <th className="text-left px-4 py-2">Care Instruction</th>
                                            <th className="text-left px-4 py-2">Category</th>
                                            <th className="text-left px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shopData.map((product, idx) => (
                                            <tr key={product._id} className="border-b hover:bg-gray-100">
                                                <td className="px-4 py-2">{idx + 1}</td>
                                                <td className="px-4 py-2">
                                                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-full object-cover" />
                                                </td>
                                                <td className="px-4 py-2">{product.name}</td>
                                                <td className="px-4 py-2">{product.description}</td>
                                                <td className="px-4 py-2">${product.price}</td>
                                                <td className="px-4 py-2">{product.careInstruction}</td>
                                                <td className="px-4 py-2">{product.category}</td>
                                                <td className="px-4  flex gap-2 mt-5">
                                                    <button onClick={() => openEditModal(product)} className="text-blue-500 hover:text-blue-700">
                                                        <FaPen />
                                                    </button>
                                                    <button onClick={() => openDeleteModal(product._id)} className="text-red-500 hover:text-red-700">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Delete Confirmation Modal */}
                            {showDeleteModal && (
                                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                                        <p>Are you sure you want to delete {currentProduct?.name}?</p>
                                        <div className="mt-6 flex justify-end gap-4">
                                            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                                            <button onClick={handleDeleteProduct} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Edit Product Modal */}
                        {showEditModal && (
                            <form onSubmit={handleEditProduct}>
                                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                        <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                                        <input type="text" placeholder="Image URL" value={currentProduct.image} onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })} className="input input-bordered w-full mb-2" />
                                        <input type="text" placeholder="Name" value={currentProduct.name} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} className="input input-bordered w-full mb-2" />
                                        <input type="text" placeholder="Description" value={currentProduct.description} onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })} className="input input-bordered w-full mb-2" />
                                        <input type="text" placeholder="Price" value={currentProduct.price} onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })} className="input input-bordered w-full mb-2" />
                                        <input type="text" placeholder="Care Instructions" value={currentProduct.careInstruction} onChange={(e) => setCurrentProduct({ ...currentProduct, careInstruction: e.target.value })} className="input input-bordered w-full mb-2" />
                                        <select value={currentProduct.category} onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })} className="select select-bordered w-full mb-4">
                                            <option value="Fruit">Fruit</option>
                                            <option value="Flower">Flower</option>
                                        </select>
                                        <div className="flex justify-end gap-4">
                                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                                            <input type="submit" value="Save" className="px-4 py-2 bg-[#6f8430] text-white rounded-lg" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}

                            {/* Add Product Modal */}
                            {showAddModal && (
                                <form onSubmit={handleAddProduct}>
                                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                                            <input type="text" placeholder="Image URL" onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })} className="input input-bordered w-full mb-2" />
                                            <input type="text" placeholder="Name" onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} className="input input-bordered w-full mb-2" />
                                            <input type="text" placeholder="Description" onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })} className="input input-bordered w-full mb-2" />
                                            <input type="text" placeholder="Price" onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })} className="input input-bordered w-full mb-2" />
                                            <input type="text" placeholder="Care Instructions" onChange={(e) => setCurrentProduct({ ...currentProduct, careInstruction: e.target.value })} className="input input-bordered w-full mb-2" />
                                            <select onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })} className="select select-bordered w-full mb-4">
                                                <option value="">Select Category</option>
                                                <option value="Fruit">Fruit</option>
                                                <option value="Flower">Flower</option>
                                            </select>

                                            <div className="flex justify-end gap-4">
                                                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>

                                                <input type="submit" value="add" className="px-4 py-2 bg-[#6f8430] text-white rounded-lg" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                }
            </div>



        </>
    );
};

export default AllProducts;