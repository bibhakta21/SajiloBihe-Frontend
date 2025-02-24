import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Contact = () => {
  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message); // Show success message
        e.target.reset(); // Optionally, reset the form
      } else {
        toast.error(data.error); // Show error message
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to submit. Please try again."); // Show error message
    }
  };

  return (
    <div id="contact" className="max-w-6xl mx-auto bg-white my-6">
      <div className="text-center px-6">
        <h2 className="text-gray-800 text-3xl font-bold">Contact Us</h2>
        <p className="text-sm text-gray-500 mt-4">
          Feel free to ask any questions related to venue booking.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 items-start gap-6 p-4 shadow-md rounded-lg mt-12">
        {/* Contact Info Section */}
        <div className="bg-secondary rounded-lg p-6 text-white">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <p className="text-sm text-gray-300 mt-4">
            Feel free to reach out if you have any questions or need assistance.
          </p>
          <ul className="mt-10 space-y-6">
            <li className="flex items-center">
              <span className="material-icons text-white">email</span>
              <a href="mailto:info@example.com" className="text-sm ml-4">
                sajilobihe@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <span className="material-icons text-white">phone</span>
              <span className="text-sm ml-4">9813056161</span>
            </li>
            <li className="flex items-center">
              <span className="material-icons text-white">location_on</span>
              <span className="text-sm ml-4">Kalanki, Kathmandu</span>
            </li>
          </ul>
        </div>

        {/* Contact Form Section */}
        <div className="lg:col-span-2 bg-gray-100 p-6 rounded-lg">
          <form onSubmit={submitForm} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Question
              </label>
              <textarea
                name="message"
                placeholder="How can we help you?"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default Contact;
