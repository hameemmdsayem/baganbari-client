
const GetUpdated = () => {
    return (
        <div className="bg-black h-48 lg:h-96 p-8">
            <div className="lg:flex justify-around p-4 lg:pt-24">
                <div className="text-white">
                    <h2 className="text-2xl lg:text-5xl font-bold"><span className="block">Get updated</span>
                        <span className="block mt-0 lg:mt-4">about new plants</span></h2>
                </div>
                <div className="gap-2 flex mt-4">
                    <input type="text" placeholder="something@gmail.com" className="input input-bordered w-full" />
                    <input type="submit" value="Submit" className=" bg-gray-900 btn text-slate-50 hover:text-black"/>
                </div>
            </div>

        </div>
    );
};

export default GetUpdated;