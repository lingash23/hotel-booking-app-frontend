import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import DestinationCard from "../components/DestinatinationCard";
import CustomCarousel from "../components/Carousel";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const slides = [
  {
    image:
      "https://content.r9cdn.net/rimg/himg/7b/e1/01/leonardo-104158-160195427-279728.jpg",
    title: "Welcome to Your VIVANTA ",
    subtitle:
      "Discover new places, make memories that last a lifetime.",
  },
  {
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/47/43/0b/the-accord-metropolitan.jpg?w=1200&h=-1&s=1",
    title: "Very comfortable rooms",
    subtitle:
      "",
  },
  {
    image:
      "https://imgproxy.valpas.io/_xB_MHaG1Y_B8Ifn34pyRp42TZWYVnQpiXmzdD87TS0/rs:fill:832:434:0/wm:0:ce:0:0:0.4/aHR0cHM6Ly9pbWFnZXMuY3RmYXNzZXRzLm5ldC85Z3NwODg5dXdjbDgvNTJhNmNJMEp0NXFIcUdJUFQzZE9Lei84MGNjNDFmMWY2NzJkOWQ3OGZiNmVjZWZlYzY3MGI5YS9kZXNpZ25fMi5wbmc.jpeg",
    title: "Plan Your day",
    subtitle:
      "Ease and enjoy a seamless experience.",
  },
];

const HomePage = () => {
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        const response = await axiosInstance.get("/api/destinations/popular");
        setPopularDestinations(response.data);
      } catch (error) {
        console.error("Failed to fetch popular destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Carousel Banner */}
        <div className="mb-12">
          <CustomCarousel slides={slides} />
          <div className="text-center mt-10">
            <Link
              to="/accommodations"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Explore Accommodation
            </Link>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="popular-destinations">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Popular Destinations
          </h2>
          {loading ? (
            <div className="text-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
