import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";

const Story = () => {
  const [stories, setStories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editStoryId, setEditStoryId] = useState(null);
  const [formData, setFormData] = useState({ name: "", date: "", story: "", image: null, existingImage: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletePopup, setDeletePopup] = useState({ isOpen: false, storyId: null }); // Manages delete popup state

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/stories");
      setStories(response.data);
    } catch (err) {
      setError("Failed to fetch stories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const openPopup = (story = null) => {
    setErrorMessage(""); // Clear any previous errors
    if (story) {
      setFormData({
        name: story.name,
        date: story.date.split("T")[0],
        story: story.story,
        image: null,
        existingImage: story.image || "",
      });
      setEditStoryId(story._id);
    } else {
      setFormData({ name: "", date: "", story: "", image: null, existingImage: "" });
      setEditStoryId(null);
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditStoryId(null);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.date || !formData.story || (!formData.image && !editStoryId)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        formDataObj.append("image", value);
      } else if (key !== "existingImage") {
        formDataObj.append(key, value);
      }
    });

    if (editStoryId && !formData.image) {
      formDataObj.append("existingImage", formData.existingImage);
    }

    try {
      if (editStoryId) {
        await axios.put(`http://localhost:3000/api/stories/${editStoryId}`, formDataObj, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:3000/api/stories", formDataObj, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }
      fetchStories();
      closePopup();
    } catch (err) {
      setErrorMessage("Failed to process request.");
    }
  };

 // Open delete confirmation popup
 const openDeletePopup = (id) => {
  setDeletePopup({ isOpen: true, storyId: id });
};

// Close delete confirmation popup
const closeDeletePopup = () => {
  setDeletePopup({ isOpen: false, storyId: null });
};

// Handle delete confirmation
const handleDelete = async () => {
  try {
    await axios.delete(`http://localhost:3000/api/stories/${deletePopup.storyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStories(stories.filter((story) => story._id !== deletePopup.storyId));
    closeDeletePopup();
  } catch (err) {
    setError("Failed to delete story.");
  }
};


  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      {/* Header Section with Aligned Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => openPopup()} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <AiOutlinePlus className="mr-2" /> Add Story
        </button>
        <h2 className="text-xl font-semibold">Stories</h2>
      </div>

      {/* Stories Table */}
      <div className="overflow-x-auto">
        <table className="w-full border min-w-max">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Story</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story._id} className="border">
                <td className="border px-4 py-2">
                  <img src={`http://localhost:3000${story.image}`} className="w-16 h-16 object-cover rounded" alt="Story" />
                </td>
                <td className="border px-4 py-2">{story.name}</td>
                <td className="border px-4 py-2">{new Date(story.date).toDateString()}</td>
                <td className="border px-4 py-2 w-64" title={story.story}>
                  {truncateText(story.story, 50)}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <button onClick={() => openPopup(story)} className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center">
                    <AiFillEdit className="mr-1" /> Edit
                  </button>
                  <button onClick={() => openDeletePopup(story._id)} className="bg-red-500 text-white px-2 py-1 rounded flex items-center">
                    <AiFillDelete className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Delete Confirmation Popup */}
       {deletePopup.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this story?</p>
            <div className="flex justify-between mt-4">
              <button onClick={closeDeletePopup} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    

      {/* Custom Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{editStoryId ? "Edit Story" : "Add Story"}</h3>

            {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

            <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Story Name" className="border px-2 py-1 rounded mb-2 w-full" />
            <input type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="border px-2 py-1 rounded mb-2 w-full" />
            <textarea name="story" value={formData.story} onChange={(e) => setFormData({ ...formData, story: e.target.value })} placeholder="Story Details" className="border px-2 py-1 rounded mb-2 w-full" />
            <input type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="border px-2 py-1 rounded mb-2 w-full" />

            <div className="flex justify-between">
              <button onClick={closePopup} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">{editStoryId ? "Update" : "Add"} Story</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Story;
