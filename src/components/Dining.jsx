import React from "react";

const Dining = () => {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-slate-800 py-12">
        <div className="w-full mx-auto px-6">
          <h2 className="text-3xl font-bold dark:text-gray-200 text-center mb-6">Dining Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Restaurant 1 */}
            <div className="border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://i.ibb.co.com/6RdqgJ7/Resturent1.jpg"
                alt="The Gourmet Spot"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl dark:text-gray-300 font-bold">The Gourmet Spot</h3>
                <p className="text-gray-600 mt-2 dark:text-gray-400">
                  Fine dining with an international menu.
                </p>
                <a
                  href="#"
                  className="text-indigo-600 mt-2 block hover:underline"
                >
                  Reserve a Table
                </a>
              </div>
            </div>

            {/* Restaurant 2 */}
            <div className="border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://i.ibb.co.com/FKfk2DC/resturent2.jpg"
                alt="Ocean Breeze Café"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold dark:text-gray-300">Ocean Breeze Café</h3>
                <p className="text-gray-600 mt-2 dark:text-gray-400">
                  Relaxed atmosphere with coastal favorites.
                </p>
                <a
                  href="#"
                  className="text-indigo-600 mt-2 block hover:underline"
                >
                  Explore Menu
                </a>
              </div>
            </div>

            {/* Restaurant 3 */}
            <div className="border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://i.ibb.co.com/nkQ0jnV/Resturent3.jpg"
                alt="Sunset Grille"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold dark:text-gray-300">Sunset Grille</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Enjoy a romantic dinner with stunning sunset views.
                </p>
                <a
                  href="#"
                  className="text-indigo-600 mt-2 block hover:underline"
                >
                  Book Your Evening
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dining;
