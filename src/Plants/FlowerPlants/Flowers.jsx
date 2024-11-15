import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import useAxios from '../../hooks/useAxios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Flowers = ({ flower, email }) => {
    const axiosInstance = useAxios();

    const { _id, image, name, price, shopName, } = flower;

    const handleAddToCart = (image, name, price, shopName) => {
        const productInfo = {
            image, 
            name,
            email : email,
            price,
            shopName,
            quantity: 1
        }

        axiosInstance.post('/carts', productInfo)
        .then(() =>{
            toast.success("Added to cart!", {
                autoClose: 1000
            });
        })
       
    }


    

    return (
        <div className="w-full">
            <ToastContainer></ToastContainer>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <figure className="relative aspect-square">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <button onClick={() => handleAddToCart(image, name, price, shopName)} className="cursor-pointer absolute top-5 right-3 bg-black bg-opacity-10 rounded-full p-3">
                        <FaShoppingCart className="h-5 w-5 sm:h-5 sm:w-5 text-white " />
                    </button>
                </figure>
                <div className="card-body p-2 sm:p-4 md:p-6 bg-gradient-to-b from-green-50 to-white">
                    <h2 className="card-title text-sm sm:text-md md:text-lg font-semibold text-[#2E7D32] mb-2 truncate">{name}</h2>
                    <div className="flex flex-col lg:flex-row justify-between items-center mt-1">
                        <span className="badge badge-outline badge-lg text-white bg-[#2E7D32] border-[#2E7D32] px-2 py-1 sm:px-3 sm:py-2 mb-2 lg:mb-0">
                            ${price}
                        </span>
                        <Link to={`/plantDetails/${_id}`} className="badge badge-outline badge-lg text-xs sm:text-sm md:text-base font-medium text-[#2E7D32] hover:bg-[#2E7D32] hover:text-[#F6FCDF]">
                            <span>View Details</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

Flowers.propTypes = {
    flower: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        shopName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
};

export default Flowers;
