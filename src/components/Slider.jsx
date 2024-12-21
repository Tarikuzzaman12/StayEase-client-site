import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [
        'https://i.ibb.co/1JCPGK5/Room-Image1.jpg',
        'https://i.ibb.co/mbynPCb/Room-Image2.jpg',
        'https://i.ibb.co/cQNfKQf/room-Image3.jpg',
        'https://i.ibb.co/tJPR2sx/Room-Image4.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change the image every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative">
            {/* Slider Section */}
            <div className="carousel w-full mt-16">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`carousel-item w-full ${activeIndex === index ? 'block' : 'hidden'}`}
                    >
                        <img
                            src={src}
                            className="w-full object-cover mx-auto h-[50vh] md:h-[80vh]"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Welcome to Your Dream Stay
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Discover luxurious rooms and amazing services tailored for your comfort.
                </p>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
                >
                    <Link to="all-rooms">Explore Rooms</Link>
                </button>
            </div>

            {/* Navigation Dots */}
            <div className="flex w-full justify-center gap-2 py-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`rounded-full h-3 w-3 ${activeIndex === index ? 'bg-green-500' : 'bg-gray-400'}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
