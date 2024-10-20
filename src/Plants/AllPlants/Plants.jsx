import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Plants = ({ plant }) => {

    const {_id, image, name, price, } = plant;

    return (
        <div >
            <Link to={`/plantDetails/${_id}`}>
                <div className="card bg-base-100 w-64 shadow-xl cursor-pointer">
                    <figure>
                        <img
                            src={image}
                            alt={name}
                            className='w-72 h-64'
                        />
                    </figure>
                    <div className="card-body">
                        <h2 ><span className='font-bold'>Name:</span> {name}</h2>
                        <p className="font-bold">${price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

Plants.propTypes = {
    plant: PropTypes.object
}

export default Plants;