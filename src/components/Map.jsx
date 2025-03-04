import React from "react";

const Map = () => {
  return (
    <div className="flex justify-center items-center dark:bg-slate-800w-full">
      <div className="w-full  shadow-lg overflow-hidden dark:bg-slate-800 py-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8462.189591586932!2d90.387200604544!3d23.76143524814073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a6f07c2ded%3A0xba952f3052ca5c0a!2sFarmgate!5e0!3m2!1sen!2sbd!4v1735233136355!5m2!1sen!2sbd"
          width="600"
          height="450"
          className="border-0 w-full h-72 sm:h-96 md:h-[450px] dark:invert dark:hue-rotate-180"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
