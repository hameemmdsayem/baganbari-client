import { useLoaderData } from "react-router-dom";
import HelmetHook from "../../hooks/HelmetHook";

const ViewDetails = () => {

    const loadedData = useLoaderData();

    const { image, name, price, description, category, care_instruction,  shop_name} = loadedData;

    return (
        <>
       <HelmetHook title={name}></HelmetHook>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row w-full">
                    <img
                        src={image}
                        className="max-w-sm h-96 rounded-lg shadow-2xl" />
                    <div className="w-full justify-center pl-8 lg:p-4 lg:w-3/4">
                        <h1 className="text-4xl font-bold">{name}</h1>
                        <p className="py-6"> {description} </p>
                       <div className="divider"></div>
                        <p><span className="font-semibold">Insstruction:</span> {care_instruction}</p>
                        <p><span className="font-semibold">Category:</span> {category}</p>
                        <div className="divider"></div>
                        <p><span className="font-semibold">Shop Name:</span> {shop_name}</p>
                        <p className="font-bold text-xl">Price: ${price}</p>

                        <button className="btn btn-outline btn-success mt-8 w-48 text-lg">Buy Now</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ViewDetails;