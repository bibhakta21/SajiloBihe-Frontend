import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const ResponsiveMenu = ({ isOpen }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 lg:hidden"
        >
          <div className="text-xl font-semibold uppercase bg-blue-600 text-white py-10 m-6 rounded-3xl">
          <ul className="flex flex-col justify-center items-center gap-10">
          <li>  <a href="/">Home </a></li>
          <li> <a href="/">Venues </a></li>
          <li> <a href="/">About </a></li>
          <li> <a href="/">Contact </a></li>
        </ul>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
