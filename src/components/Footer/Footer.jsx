import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sajilo<span className="text-blue-500">Bihe</span></h1>
        <p className="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="text-white hover:text-blue-500">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};
