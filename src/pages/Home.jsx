import React from 'react';
import Slider from '../components/Slider';
import FeaturesRooms from '../components/FeaturesRooms';
import Map from '../components/Map';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturesRooms></FeaturesRooms>
          <div className="my-[100px] w-11/12 mx-auto">  <Map></Map></div>
        </div>
    );
};

export default Home;