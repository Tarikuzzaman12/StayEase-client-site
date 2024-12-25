import React from 'react';
import Slider from '../components/Slider';
import FeaturesRooms from '../components/FeaturesRooms';
import Map from '../components/Map';
import ExtraSection1 from '../components/ExtraSection1';
import ExtraSection2 from '../components/ExtraSection2';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturesRooms></FeaturesRooms>
          <div className="my-[100px] w-11/12 mx-auto">  <Map></Map></div>
         <div> <ExtraSection1></ExtraSection1></div>
         <ExtraSection2></ExtraSection2>
        </div>
    );
};

export default Home;