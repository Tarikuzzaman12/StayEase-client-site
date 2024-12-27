import React from 'react';
import Slider from '../components/Slider';
import FeaturesRooms from '../components/FeaturesRooms';
import Map from '../components/Map';
import ExtraSection1 from '../components/ExtraSection1';
import ExtraSection2 from '../components/ExtraSection2';
import Homep from '../components/Homep';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturesRooms></FeaturesRooms>
          <div className="my-[100px] w-11/12 mx-auto">  <Map></Map></div>
         <div> <ExtraSection1></ExtraSection1></div>
         <ExtraSection2></ExtraSection2>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto w-8/12  pb-6'><Homep ></Homep></div>
        </div>
    );
};

export default Home;