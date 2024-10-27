import { useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const SearchPlants = () => {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (!keyword) return; // Prevent search if keyword is empty
        try {
            const response = await fetch(`http://localhost:5000/plants?name=${keyword}`);

            if (!response.ok) {
                const errorData = await response.json(); // Try to parse the JSON error response
                console.error('Error fetching plants:', errorData.error); // Log the error message
                setSearchResults([]); // Clear results if there's an error
                return;
            }

            const data = await response.json(); // Parse the successful response
            setSearchResults(data);  // Assume your API returns an array of plants
        } catch (error) {
            console.error('Error fetching plants:', error); // Handle network or other errors
        }
    };

    return (
        <div className='pt-20'>
            <div className="bg-white p-6 rounded-lg shadow-md max-w mx-auto lg:px-96">
                <h2 className="text-2xl font-bold text-[#859F3D] mb-4 text-center">Search Plants</h2>
                <div className="flex gap-4">
                    {/* Keyword Input */}
                    <input
                        type="text"
                        placeholder="Enter plant name or keyword"
                        className="input input-bordered w-full"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} // Update state on input change
                    />

                    {/* Search Button */}
                    <button
                        className="btn bg-[#F6FCDF] hover:bg-[#859F3D] text-[#859F3D] hover:text-white flex items-center"
                        onClick={handleSearch} // Call handleSearch when button is clicked
                    >
                        <IoSearchCircleOutline className="w-5 h-5 mr-1" />
                        Search
                    </button>
                </div>
            </div>

            {/* Display search results */}
            <div className='flex justify-center'>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((plant) => (
                        <Link to={`/plantDetails/${plant._id}`} key={plant._id}>
                            <div className="card bg-base-100 w-64 shadow-xl cursor-pointer">
                                <figure>
                                    <img
                                        src={plant.image} // Assuming 'image' is a field in your plant document
                                        alt={plant.name}   // Assuming 'name' is a field in your plant document
                                        className='w-72 h-60'
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2><span className='font-bold'>Name:</span> {plant.name}</h2>
                                    <p className="font-bold">${plant.price}</p> {/* Assuming 'price' is a field in your plant document */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPlants;
