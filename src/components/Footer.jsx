import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Services Section */}
                <nav>
                    <h6 className="text-lg font-semibold mb-4">Our Services</h6>
                    <ul className="space-y-2">
                        <li><a href="rooms" className="hover:text-gray-300">Hotel Rooms</a></li>
                        <li><a href="#" className="hover:text-gray-300">Room Booking</a></li>
                        <li><a href="#" className="hover:text-gray-300">Special Offers</a></li>
                        <li><a href="#" className="hover:text-gray-300">Corporate Packages</a></li>
                    </ul>
                </nav>

                {/* Company Section */}
                <nav>
                    <h6 className="text-lg font-semibold mb-4">About StayEase</h6>
                    <ul className="space-y-2">
                        <li><a href="about" className="hover:text-gray-300">About Us</a></li>
                        <li><a href="contact" className="hover:text-gray-300">Contact Us</a></li>
                        <li><a href="#" className="hover:text-gray-300">Careers</a></li>
                        <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                    </ul>
                </nav>

                {/* Newsletter Section */}
                <div>
                    <h6 className="text-lg font-semibold mb-4">Newsletter</h6>
                    <p className="text-sm mb-4 text-gray-400">
                        Subscribe to receive exclusive deals, offers, and updates.
                    </p>
                    <form className="flex items-center space-x-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 px-4 py-2 text-black rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="btn btn-primary px-4 py-2">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} StayEase. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
