import React from "react";
import image01 from "../../assets/images/image01.jpg";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="w-full mt-16">
      {/* Hero Banner */}
      <div className="w-full h-64 md:h-96 overflow-hidden">
        <img
          src="https://www.a1trek.com/storage/trip-galleries/163/c42679335d59ffd117d6d600e631594e.jpeg"
          className="w-full h-full object-cover"
          alt="Nepal landscape"
        />
      </div>

      {/* Latest & Trending Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Latest Section - Left Side */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Latest
            </h2>
            <div className="rounded-lg overflow-hidden border border-gray-100">
              <img
                src="https://www.honeymoonbug.com/blog/wp-content/uploads/2020/10/nepal.jpg"
                className="w-full h-48 md:h-56 object-cover"
                alt="Latest post"
              />
              <div className="p-4">
                <span className="text-sm font-medium text-blue-600">
                  Travel Guide
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-gray-800 hover:text-blue-600 transition">
                  <Link to="#">Exploring Kagbeni: Gateway to Mustang</Link>
                </h3>
                <div className="flex items-center mt-4">
                  <img
                    src={image01}
                    alt="Author"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      Yatri Explorer
                    </p>
                    <p className="text-xs text-gray-500">May 15, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Section - Right Side */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Trending
            </h2>
            <div className="space-y-6">
              {/* Trending Item 1 */}
              <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
                <div className="sm:w-1/4">
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.BtysWUjTPLBZVmoqL3LDGgHaHZ&pid=Api&P=0&h=220"
                    className="w-full h-32 sm:h-full object-cover rounded-lg"
                    alt="Kagbeni"
                  />
                </div>
                <div className="sm:w-3/4">
                  <span className="text-sm font-medium text-blue-600">
                    Cultural Journey
                  </span>
                  <h3 className="text-lg font-semibold mt-1 mb-2 text-gray-800 hover:text-blue-600 transition hover:underline">
                    <Link to="#">
                      Kagbeni: Gateway to the Forbidden Kingdom of Mustang
                    </Link>
                  </h3>
                  <div className="flex items-center mt-3">
                    <img
                      src={image01}
                      alt="Author"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600 ml-2">
                      Himalayan Trekker | 8 min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Trending Item 2 */}
              <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
                <div className="sm:w-1/4">
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.rbsSqXLKtT13deNqEh_bGgHaFj&pid=Api&P=0&h=220"
                    className="w-full h-32 sm:h-full object-cover rounded-lg"
                    alt="Tansen"
                  />
                </div>
                <div className="sm:w-3/4">
                  <span className="text-sm font-medium text-blue-600">
                    Hill Station
                  </span>
                  <h3 className="text-lg font-semibold mt-1 mb-2 text-gray-800 hover:text-blue-600 transition hover:underline">
                    <Link to="#">
                      Tansen: A Hidden Hill Station with Newari Charm
                    </Link>
                  </h3>
                  <div className="flex items-center mt-3">
                    <img
                      src={image01}
                      alt="Author"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600 ml-2">
                      Cultural Explorer | 6 min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Trending Item 3 */}
              <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
                <div className="sm:w-1/4">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.Tdvtig3BGPsz3FNqUjeYXwHaEK&pid=Api&P=0&h=220"
                    className="w-full h-32 sm:h-full object-cover rounded-lg"
                    alt="Rara Lake"
                  />
                </div>
                <div className="sm:w-3/4">
                  <span className="text-sm font-medium text-blue-600">
                    Nature Escape
                  </span>
                  <h3 className="text-lg font-semibold mt-1 mb-2 text-gray-800 hover:text-blue-600 transition hover:underline">
                    <Link to="#">
                      Rara Lake: Nepal's Pristine Alpine Wonder
                    </Link>
                  </h3>
                  <div className="flex items-center mt-3">
                    <img
                      src={image01}
                      alt="Author"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600 ml-2">
                      Nature Lover | 10 min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Trending Item 4 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/4">
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.PPVOq8I0Ogz1tfDaCiG73AHaEs&pid=Api&P=0&h=220"
                    className="w-full h-32 sm:h-full object-cover rounded-lg"
                    alt="Panch Pokhari"
                  />
                </div>
                <div className="sm:w-3/4">
                  <span className="text-sm font-medium text-blue-600">
                    Pilgrimage
                  </span>
                  <h3 className="text-lg font-semibold mt-1 mb-2 text-gray-800 hover:text-blue-600 transition hover:underline">
                    <Link to="#">Panch Pokhari: Sacred Himalayan Lakes</Link>
                  </h3>
                  <div className="flex items-center mt-3">
                    <img
                      src={image01}
                      alt="Author"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600 ml-2">
                      Spiritual Traveler | 7 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Experiences */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          More Nepal Destinations
        </h1>
        <p className="text-gray-600 mb-8">
          Discover these incredible places that showcase Nepal's diverse beauty
          and culture.
        </p>

        <div className="space-y-6">
          {/* Destination 1 */}
          <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
            <div className="sm:w-1/4">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.nXX61X10MUFymuFYpWznuAHaEo&pid=Api&P=0&h=220"
                className="w-full h-32 sm:h-full object-cover rounded-lg"
                alt="Namche Bazaar"
              />
            </div>
            <div className="sm:w-3/4">
              <span className="text-sm font-medium text-blue-600">
                Mountain Culture
              </span>
              <h3 className="text-lg font-semibold mt-1 mb-2 text-gray-800 hover:text-blue-600 transition hover:underline">
                <Link to="#">Namche Bazaar: The Sherpa Capital</Link>
              </h3>
              <div className="flex items-center mt-3">
                <img
                  src={image01}
                  alt="Author"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600 ml-2">
                  Mountain Guide | 9 min read
                </span>
              </div>
            </div>
          </div>

          {/* Destination 2 */}
          <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
            <div className="sm:w-1/4">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.H74TSMDFoLQHKRYhjz6O0AHaE7&pid=Api&P=0&h=220"
                className="w-full h-32 sm:h-full object-cover rounded-lg"
                alt="Jumla"
              />
            </div>
            <div className="sm:w-3/4">
              <span className="text-sm font-medium text-blue-600">
                Cultural Heritage
              </span>
              <h3 className="text-lg font-semibold mt-1 mb-2 text-gray-800 hover:text-blue-600 transition hover:underline">
                <Link to="#">
                  Jumla: Land of Ancient Monasteries and Apples
                </Link>
              </h3>
              <div className="flex items-center mt-3">
                <img
                  src={image01}
                  alt="Author"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600 ml-2">
                  History Buff | 5 min read
                </span>
              </div>
            </div>
          </div>

          {/* Destination 3 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/4">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.GSGcdCjZD5iw9nHoWYj81QHaEP&pid=Api&P=0&h=220"
                className="w-full h-32 sm:h-full object-cover rounded-lg"
                alt="Dhorpatan"
              />
            </div>
            <div className="sm:w-3/4">
              <span className="text-sm font-medium text-blue-600">
                Wildlife Adventure
              </span>
              <h3 className="text-lg font-semibold mt-1 mb-2 text-gray-800 hover:text-blue-600 transition hover:underline">
                <Link to="#">Dhorpatan: Nepal's Only Hunting Reserve</Link>
              </h3>
              <div className="flex items-center mt-3">
                <img
                  src={image01}
                  alt="Author"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600 ml-2">
                  Wildlife Enthusiast | 12 min read
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Blog;
