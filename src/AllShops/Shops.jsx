import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Shops = ({ shop }) => {

    const { _id, name } = shop;

    return (
        <Link to={`/shopDetails/${_id}`}>
            <div className="card bg-base-100 w-64 shadow-xl">
                {/* <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure> */}
                <div className="card-body">
                    <h2 className='font-bold text-center'>{name}</h2>
                </div>
            </div>
        </Link>
    );
};

Shops.propTypes = {
    shop: PropTypes.object
}

export default Shops;