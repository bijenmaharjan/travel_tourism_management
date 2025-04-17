import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../store/admin/admin";
import { fetchTravelPackages } from "../../store/admin/admintravel";
import UserHotelTile from "../../components/user/UserHotelTile";
import SupportClientbox from "../../components/user/SupportClientbox";
import Footer from "../../components/management/Footer";
import { PackageCardTour } from "../../components/user/PackageGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollToTop from "../../components/user/ScrollToTop";

// Import placeholder images (replace with your actual images)
import placeholder1 from "../../assets/images/image1.png";
import placeholder2 from "../../assets/images/image2.png";
import placeholder3 from "../../assets/images/image3.png";
import placeholder4 from "../../assets/images/image4.png";
import placeholder5 from "../../assets/images/image5.png";
import placeholder6 from "../../assets/images/image6.png";
import placeholder7 from "../../assets/images/image7.png";
import { useLocation } from "react-router-dom";

const slideshowImages = [
  {
    id: 1,
    image: placeholder1,
    alt: "Mountain landscape",
    quote: "The mountains are calling and I must go",
  },
  {
    id: 2,
    image: placeholder2,
    alt: "Tropical beach",
    quote: "Saltwater cures all things",
  },
  {
    id: 3,
    image: placeholder3,
    alt: "City skyline",
    quote: "Cities have souls too",
  },
  {
    id: 4,
    image: placeholder4,
    alt: "Desert sunset",
    quote: "Adventure is worthwhile",
  },
  {
    id: 5,
    image: placeholder5,
    alt: "Forest pathway",
    quote: "In nature, we find peace",
  },
  {
    id: 6,
    image: placeholder6,
    alt: "Forest pathway",
    quote: "",
  },
  {
    id: 7,
    image: placeholder7,
    alt: "Forest pathway",
    quote: "",
  },
];

const ImageSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loaded = {};
      for (const img of images) {
        try {
          const image = new Image();
          image.src = img.image;
          await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
          });
          loaded[img.id] = true;
        } catch (error) {
          console.error(`Failed to load image ${img.id}`, error);
          loaded[img.id] = false;
        }
      }
      setLoadedImages(loaded);
    };

    loadImages();
  }, [images]);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentIndex];
  const isImageLoaded = loadedImages[currentImage.id];

  return (
    <div className="relative w-full h-[500px] md:h-[800px] overflow-hidden bg-gray-100">
      <div className="relative w-full h-full">
        {isImageLoaded ? (
          <img
            src={currentImage.image}
            alt={currentImage.alt}
            className="w-full h-full object-fill object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">Loading image...</p>
          </div>
        )}

        <div className="absolute inset-0  bg-opacity-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-white font-bold italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 font-dancing-script">
            TRAVEL IS TO LIVE
          </h1>
          <p className="text-white text-xl sm:text-2xl md:text-3xl mb-8">
            {currentImage.quote}
          </p>
          <button className="bg-pink-300 text-gray-700 px-6 py-3 rounded-2xl animate-bounce text-lg sm:text-xl md:text-2xl">
            Start Travel
          </button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-white w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const { hotelList } = useSelector((state) => state.adminHotel);
  const { packages = [] } = useSelector((state) => state.travelPackage || {});
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchAllHotels());
    dispatch(fetchTravelPackages());
  }, [dispatch]);

  return (
    <div className="w-full bg-gray-50">
      <ScrollToTop />
      <ImageSlideshow images={slideshowImages} />

      {/* Hotels Section with Enhanced Heading */}
      <div className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Luxury Stays
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience world-class hospitality at our handpicked selection of
            premium hotels and resorts
          </p>
        </div>

        {hotelList?.length > 0 ? (
          <UserHotelTile
            hotels={hotelList}
            showFilters={false}
            itemsPerPage={12}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Currently updating our hotel collection. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="w-full mt-16 bg-gray-100 py-12">
        <SupportClientbox />
      </div>

      {/* Tour Packages Section with Enhanced Heading */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Curated Travel Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our exclusive packages designed to create unforgettable
            memories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <PackageCardTour key={pkg.id || pkg._id} package={pkg} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                New Adventures Coming Soon
              </h3>
              <p className="text-gray-600">
                We're preparing exciting new travel packages for you
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
