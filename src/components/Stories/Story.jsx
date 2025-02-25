import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";

const Story = () => {
  const [stories, setStories] = useState([]); // Store fetched stories

  // Fetch stories from the backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/stories/");
        setStories(response.data); // Store all stories
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="w-full">
      {stories.length > 0 ? (
        stories.map((story, index) => (
          <div key={story._id} className="mb-12">
            {/* Hero Section */}
            <div
              className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center"
              style={{ backgroundImage: `url(http://localhost:3000${story.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold">{story.name}</h1>
                <p className="text-sm md:text-lg mt-2">{new Date(story.date).toDateString()}</p>
              </div>
            </div>

            {/* Our Story Section */}
            <div className="py-12 px-6 md:px-16 lg:px-32 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Story</h2>

              {/* Heart Divider */}
              <div className="flex items-center justify-center mt-3">
                <div className="w-12 md:w-16 h-[2px] bg-gray-400"></div>
                <AiFillHeart className="text-red-500 mx-2 text-lg md:text-xl" />
                <div className="w-12 md:w-16 h-[2px] bg-gray-400"></div>
              </div>

              {/* Story Text */}
              <p className="text-gray-600 mt-6 leading-relaxed text-sm md:text-base lg:text-lg">
                {story.story}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">Fetching stories...</p>
      )}
    </div>
  );
};

export default Story;
