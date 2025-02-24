import React from "react";
import { GiPartyPopper } from "react-icons/gi";
import { FaRegClock } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";

const WhyChooseData = [
  {
    id: 1,
    title: "Wide Range of Venues",
    desc: "Explore a variety of event venues to fit your unique requirements.",
    icon: <GiPartyPopper />,
    bgColor: "#0063ff",
  },
  {
    id: 2,
    title: "Easy Online Booking",
    desc: "Book your event venue in just a few clicks with our simple online system.",
    link: "/",
    icon: <FaRegClock />,
    bgColor: "#73bc00",
  },
  {
    id: 3,
    title: "Prime Locations",
    desc: "Choose venues located in the heart of the city for your convenience.",
    link: "/",
    icon: <IoIosPin />,
    bgColor: "#fa6400",
  },
  {
    id: 4,
    title: "Affordable Packages",
    desc: "We offer competitive pricing for all event venue bookings to fit your budget.",
    link: "/",
    icon: <GiPartyPopper />,
    bgColor: "#fe6baa",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-[#f9fafc]">
      <div className="container py-24">
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-blue-600">
            Why Choose Us
          </h1>
          <p className="font-semibold text-3xl">
            Benefits of booking with our event venues
          </p>
        </div>
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {WhyChooseData.map((item) => {
            return (
              <div
                key={item.id}
                className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)]"
              >
                {/* icon section */}
                <div
                  style={{ backgroundColor: item.bgColor }}
                  className="w-10 h-10 rounded-lg flex justify-center items-center text-white"
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
