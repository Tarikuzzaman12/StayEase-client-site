import React from 'react';

const Nearby = () => {
    return (
        <div>
            <section className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Explore Nearby Attractions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Attraction 1 */}
                        <div className="border rounded-lg shadow-md overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="Attraction" 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold">Central Park</h3>
                                <p className="text-gray-600 mt-2">
                                    A beautiful urban park with scenic trails and relaxing greenery.
                                </p>
                                <p className="text-gray-500 mt-1">Distance: 2.5 km</p>
                            </div>
                        </div>

                        {/* Attraction 2 */}
                        <div className="border rounded-lg shadow-md overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1541264161754-445bbdd7de52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="Attraction" 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold">City Museum</h3>
                                <p className="text-gray-600 mt-2">
                                    Discover the history and culture of the city through stunning exhibits.
                                </p>
                                <p className="text-gray-500 mt-1">Distance: 1.8 km</p>
                            </div>
                        </div>

                        {/* Attraction 3 */}
                        <div className="border rounded-lg shadow-md overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1506812574058-fc75fa93fead?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="Attraction" 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold">Ocean View Beach</h3>
                                <p className="text-gray-600 mt-2">
                                    Relax by the shore and enjoy breathtaking ocean views.
                                </p>
                                <p className="text-gray-500 mt-1">Distance: 3.2 km</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Nearby;
