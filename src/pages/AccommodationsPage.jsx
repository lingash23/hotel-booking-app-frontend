import React, { useEffect, useState } from "react";
import AccommodationCard from "../components/AccommodationCard";
import { fetchAccommodations } from "../api/accommodation";
import { toast } from "react-toastify";
import CustomCarousel from "../components/Carousel";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

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

const AccommodationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await fetchAccommodations(
          searchQuery,
          accommodationType
        );
        setAccommodations(results);
      } catch (error) {
        toast.error("Failed to fetch accommodations");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, accommodationType]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await fetchAccommodations(searchQuery, accommodationType);
      setAccommodations(results);
    } catch (error) {
      toast.error("Failed to fetch accommodations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="carousel-container mb-8">
          <CustomCarousel slides={slides} />
        </div>
        <h1 className="text-2xl text-center font-bold mb-4">
          Search Accommodations
        </h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="text"
              placeholder="Search for accommodations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded w-full md:w-3/4 mb-4 md:mb-0"
            />
            <select
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
              className="border p-2 rounded w-full md:w-1/4"
            >
              <option value="">All Types</option>
              <option value="Hotel">Hotel</option>
              <option value="Hostel">Hostel</option>
              <option value="Resort">Resort</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 hover:shadow-md hover:shadow-blue-400 text-black px-4 py-2 rounded-full "
            >
              Search
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex flex-col justify-center items-center text-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.length === 0 ? (
              <p>No accommodations found.</p>
            ) : (
              accommodations.map((acc) => (
                <AccommodationCard key={acc._id} accommodation={acc} />
              ))
            )}
          </div>
        )}
      </div>
      <footer/>
    </>
  );
};

export default AccommodationsPage;
