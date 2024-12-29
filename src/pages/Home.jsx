import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import FeaturesRooms from "../components/FeaturesRooms";
import Map from "../components/Map";
import ExtraSection1 from "../components/ExtraSection1";
import ExtraSection2 from "../components/ExtraSection2";
import Homep from "../components/Homep";
import OfferModal from "../components/OfferModal";
import Nearby from "../components/Nearby";
import Dining from "../components/Dining";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show the modal automatically on load
    setTimeout(() => {
      setIsModalOpen(true);
    }, 1000); // Delay modal by 1 second
  }, []);

  return (
    <div>
      <Helmet>
        <title>StayEase | Home</title>
      </Helmet>
      <div>
      <Slider />
      <FeaturesRooms />
      <div className="my-[100px] w-11/12 mx-auto">
        <Map />
      </div>
      <ExtraSection1 />
      <ExtraSection2 />
      <Nearby></Nearby>
      <Dining></Dining>
      <div>
        <Homep />
      </div>

      {/* Offer Modal */}
      <OfferModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
    </div>
    
  );
};

export default Home;
