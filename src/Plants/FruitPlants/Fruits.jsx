import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const Fruits = ({ fruit }) => {
    const { _id, image, name, price } = fruit;

    return (
        <div className="w-full">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <figure className="relative aspect-square">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-5 right-3 bg-black bg-opacity-10 rounded-full p-3">
                        <FaShoppingCart className="h-5 w-5 sm:h-5 sm:w-5 text-white cursor-pointer" />
                    </div>
                </figure>
                <div className="card-body p-2 sm:p-4 md:p-6 bg-gradient-to-b from-yellow-50 to-white">
                    <h2 className="card-title text-sm sm:text-md md:text-lg font-semibold text-[#2E7D32] mb-2 truncate">{name}</h2>
                    <div className="flex flex-col lg:flex-row justify-between items-center mt-1">
                        <span className="badge badge-outline badge-lg text-white bg-[#2E7D32] border-[#2E7D32] px-2 py-1 sm:px-3 sm:py-2 mb-4">
                            ${price.toFixed(2)}
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

Fruits.propTypes = {
    fruit: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
};

export default Fruits;
