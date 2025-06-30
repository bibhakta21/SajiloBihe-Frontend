import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [venueData, setVenueData] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    description: "",
    available: true,
    images: null,
    existingImages: [],
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [editVenueId, setEditVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteVenueId, setDeleteVenueId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch venues from API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/venues");
        setVenues(response.data);
      } catch (err) {
        setError("Failed to fetch venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Open modal for adding or editing
  const openModal = (venue = null) => {
    setValidationErrors({});
    if (venue) {
      setVenueData({
        name: venue.name,
        location: venue.location,
        capacity: venue.capacity,
        price: venue.price,
        description: venue.description,
        available: venue.available,
        images: null,
        existingImages: venue.images || [],
      });
      setEditVenueId(venue._id);
    } else {
      setVenueData({
        name: "",
        location: "",
        capacity: "",
        price: "",
        description: "",
        available: true,
        images: null,
        existingImages: [],
      });
      setEditVenueId(null);
    }
    setIsModalOpen(true);
  };

  // Validate form data
  const validateForm = () => {
    let errors = {};
    if (!venueData.name) errors.name = "Name is required";
    if (!venueData.location) errors.location = "Location is required";
    if (!venueData.capacity || venueData.capacity <= 0) errors.capacity = "Capacity must be greater than 0";
    if (!venueData.price || venueData.price <= 0) errors.price = "Price must be greater than 0";
    if (!venueData.description) errors.description = "Description is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Prevent form submission if validation fails

    const formData = new FormData();
    Object.entries(venueData).forEach(([key, value]) => {
      if (key === "images" && value) {
        Array.from(value).forEach((file) => formData.append("images", file));
      } else if (key !== "existingImages") {
        formData.append(key, value);
      }
    });

    if (editVenueId && !venueData.images) {
      formData.append("existingImages", JSON.stringify(venueData.existingImages));
    }

    try {
      if (editVenueId) {
        // Update venue
        const response = await axios.put(
          `http://localhost:3000/api/venues/${editVenueId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setVenues(venues.map((venue) => (venue._id === editVenueId ? response.data.updatedVenue : venue)));
      } else {
        // Add new venue
        const response = await axios.post("http://localhost:3000/api/venues", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setVenues([...venues, response.data.venue]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to process the request. Please try again.");
    }
  };

  const handleDeleteVenue = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/venues/${deleteVenueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVenues(venues.filter((venue) => venue._id !== deleteVenueId));
      setDeleteVenueId(null);
    } catch (err) {
      setError("Failed to delete venue. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Venues</h2>

      <button onClick={() => openModal()} className="bg-green-500 text-white px-4 py-1 rounded mb-4">
        Add Venue
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">{editVenueId ? "Edit Venue" : "Add Venue"}</h3>

            {["name", "location", "capacity", "price", "description"].map((field) => (
              <div key={field} className="mb-2">
                <input
                  type={field === "capacity" || field === "price" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={venueData[field]}
                  onChange={(e) => setVenueData({ ...venueData, [field]: e.target.value })}
                  className={`border px-2 py-1 rounded w-full ${
                    validationErrors[field] ? "border-red-500" : "border-green-500"
                  }`}
                />
                {validationErrors[field] && (
                  <p className="text-red-500 text-sm">{validationErrors[field]}</p>
                )}
              </div>
            ))}

            <input type="file" multiple onChange={(e) => setVenueData({ ...venueData, images: e.target.files })} className="border px-2 py-1 rounded mb-2 w-full" />

            <div className="flex justify-between">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-1 rounded">
                Cancel
              </button>
              <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">
                {editVenueId ? "Save Changes" : "Add Venue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteVenueId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h3>
            <div className="flex justify-between">
              <button onClick={() => setDeleteVenueId(null)} className="bg-gray-500 text-white px-4 py-1 rounded">
                Cancel
              </button>
              <button onClick={handleDeleteVenue} className="bg-red-500 text-white px-4 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

<div className="w-full overflow-scroll  sm:overflow-visible">
  <table className="w-full min-w-max border">
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-4 py-2">Image</th>
        <th className="border px-4 py-2">Name</th>
        <th className="border px-4 py-2">Location</th>
        <th className="border px-4 py-2">Capacity</th>
        <th className="border px-4 py-2">Price</th>
        <th className="border px-4 py-2">Availability</th>
        <th className="border px-4 py-2">Description</th>
        <th className="border px-4 py-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {venues.map((venue) => (
        <tr key={venue._id} className="border">
          <td className="border px-4 py-2">
            {venue.images?.[0] && (
              <img
                src={`http://localhost:3000${venue.images[0]}`}
                className="w-16 h-16 object-cover rounded"
              />
            )}
          </td>
          <td className="border px-4 py-2">{venue.name}</td>
          <td className="border px-4 py-2">{venue.location}</td>
          <td className="border px-4 py-2">{venue.capacity}</td>
          <td className="border px-4 py-2">Rs {venue.price}</td>
          <td className="border px-4 py-2">
            {venue.available ? "Available" : "Booked"}
          </td>
                <td className="border px-4 py-2">
        {venue.description.split(" ").length > 4
          ? venue.description.split(" ").slice(0, 4).join(" ") + "..."
          : venue.description}
      </td>

          <td className="border px-4 py-2 whitespace-nowrap text-center">
            <button
              onClick={() => openModal(venue)}
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteVenueId(venue._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>





    </div>
  );
};

export default Products;
