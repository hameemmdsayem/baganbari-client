import FruitHome from "../FruitHome/FruitHome";
import BannerHome from "../Banner/BannerHome";
import BestSeller from "../BestSeller/BestSeller";
import FlowerHome from "../FlowerHome/FlowerHome";
import GetUpdated from "../GetUpdated/GetUpdated";

const Home = () => {
    return (
           <div>
                <BannerHome name="BaganBari"></BannerHome>
                <FlowerHome></FlowerHome>
                <FruitHome></FruitHome>
                <BestSeller></BestSeller>
                <GetUpdated></GetUpdated>
           </div>
    );
};

export default Home;