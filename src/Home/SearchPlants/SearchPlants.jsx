import { useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const SearchPlants = () => {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false); // Track if no results were found

    const handleSearch = async () => {
        if (!keyword) return; // Prevent search if keyword is empty
        try {
            const response = await fetch(`http://localhost:5000/plants?name=${keyword}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error fetching plants:', errorData.error);
                setSearchResults([]);
                setNoResults(true); // Show no results message on error
                return;
            }

            const data = await response.json();
            setSearchResults(data);
            setNoResults(data.length === 0); // Show no results message if data array is empty
        } catch (error) {
            console.error('Error fetching plants:', error);
            setNoResults(true); // Show no results message on network error
        }
    };

    return (
        <div className='pt-20'>
            <div className="bg-white p-6 rounded-lg shadow-md max-w mx-auto lg:px-96">
                <h2 className="text-2xl font-bold text-[#2E7D32] mb-4 text-center">Search Plants</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter plant name or keyword"
                        className="input input-bordered w-full"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                        className="btn bg-[#F6FCDF] hover:bg-[#2E7D32] text-[#2E7D32] hover:text-white flex items-center"
                        onClick={handleSearch}
                    >
                        <IoSearchCircleOutline className="w-5 h-5 mr-1" />
                        Search
                    </button>
                </div>
            </div>

            <div className='flex justify-center'>
                {noResults ? (
                    <p className="text-red-500 mt-8 text-center">No items found. Please try a different search term.</p>
                ) : (
                    <div className="m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((plant) => (
                            <Link to={`/plantDetails/${plant._id}`} key={plant._id}>
                                <div className="card bg-base-100 w-64 shadow-xl cursor-pointer">
                                    <figure>
                                        <img
                                            src={plant.image}
                                            alt={plant.name}
                                            className='w-72 h-60'
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2><span className='font-bold'>Name:</span> {plant.name}</h2>
                                        <p className="font-bold">${plant.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPlants;
