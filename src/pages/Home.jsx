import React from 'react';
import Slider from '../components/Slider';
import FeaturesRooms from '../components/FeaturesRooms';
import Map from '../components/Map';
import ExtraSection1 from '../components/ExtraSection1';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturesRooms></FeaturesRooms>
          <div className="my-[100px] w-11/12 mx-auto">  <Map></Map></div>
         <div> <ExtraSection1></ExtraSection1></div>
        </div>
    );
};

export default Home;