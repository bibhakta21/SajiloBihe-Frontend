import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram } from "react-icons/fa";

const backendURL = "http://localhost:3000";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [venue, setVenue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/venues/${id}`);
        setVenue(response.data);
        setSelectedImage(response.data.images[0]);
      } catch (err) {
        setError("Failed to fetch venue details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login first to book.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendURL}/api/bookings`,
        { venueId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Your appointment is booked!", { duration: 3000 });
        setBookingSuccess(true);
        setTimeout(() => {
          navigate("/cart");
        }, 2000);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.error, { duration: 3000 });
      } else {
        toast.error("Failed to book appointment.", { duration: 3000 });
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <nav className="text-gray-600 text-sm mb-6">
        <Link to="/product" className="hover:underline">Product</Link> <span> &gt; </span>
        <span className="text-black font-semibold">{venue.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 flex">
          <div className="flex flex-col space-y-2 mr-4">
            {venue.images.map((img, index) => (
              <img
                key={index}
                src={img.startsWith("/") ? `${backendURL}${img}` : img}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover rounded-md cursor-pointer border border-gray-300 hover:border-blue-500"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage.startsWith("/") ? `${backendURL}${selectedImage}` : selectedImage}
              alt="Product"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
          <p className="text-2xl text-gray-700 mb-2">Rs {venue.price} /plate</p>
          <p className="text-secondary text-lg font-semibold">Price is negotiable, come visit us.</p>
          <p className="text-gray-600 mt-4">{venue.location}</p>
          <p className="text-gray-600 mt-4">{venue.description}</p>
          <p className="text-lg font-semibold mt-4">
            Availability: <span className={venue.available ? "text-green-500" : "text-red-500"}>
              {venue.available ? "Available" : "Booked"}
            </span>
          </p>
          <p className="text-gray-600 mt-4">Veg/Nonveg</p>

          <button 
            onClick={handleBooking} 
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
          >
            Book Appointment
          </button>

          {/* Social Media */}
          <div className="mt-6 flex items-center space-x-4 text-gray-600">
            <div className="flex space-x-4 text-xl">
              <FaFacebook className="cursor-pointer hover:text-blue-500" />
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaPinterest className="cursor-pointer hover:text-red-500" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
