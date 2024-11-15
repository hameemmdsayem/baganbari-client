import PropTypes from 'prop-types'; 
import bannerImage from "../../assets/plants-bg.png"; 

const PublicBanner = ({ title, description }) => {
  return (
    <div
      className="relative lg:h-[30vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bannerImage})` }} // Corrected the backgroundImage syntax
    >
      {/* Centered Text Section with Dark Background */}
      <div className="text-center lg:py-24 py-20 px-20 rounded-lg max-w-xl">
        <h1 className="text-xl lg:text-3xl font-bold text-[#31a937]"> 
          {title}
        </h1>
        <p className="text-base lg:text-xl mt-4 text-white"> 
          {description}
        </p>
      </div>
    </div>
  );
};

PublicBanner.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default PublicBanner;
