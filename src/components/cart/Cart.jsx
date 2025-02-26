import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";

const backendURL = "http://localhost:3000";

const TABLE_HEAD = [
  { head: "Image", customStyle: "!text-left" },
  { head: "Venue", customStyle: "text-left" },
  { head: "Price", customStyle: "text-right" },
  { head: "Capacity", customStyle: "text-right" },
  { head: "Address", customStyle: "text-left" },
  { head: "Booking Date", customStyle: "text-right" },
  { head: "Status", customStyle: "text-right" },
  { head: "Actions", customStyle: "text-center" },
];

const statusIcon = {
  confirmed: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  pending: <ClockIcon className="h-5 w-5 text-yellow-500" />,
  cancelled: <XCircleIcon className="h-5 w-5 text-red-500" />,
};

function Cart() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState({ isOpen: false, bookingId: null });

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBookings(response.data);
      } catch (error) {
        toast.error("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const openDeletePopup = (bookingId) => {
    setDeletePopup({ isOpen: true, bookingId });
  };

  const closeDeletePopup = () => {
    setDeletePopup({ isOpen: false, bookingId: null });
  };

  const handleCancelBooking = async () => {
    if (!deletePopup.bookingId) return;

    try {
      await axios.put(
        `${backendURL}/api/bookings/${deletePopup.bookingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Booking canceled successfully.");
      setBookings(bookings.filter((booking) => booking._id !== deletePopup.bookingId));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to cancel booking.");
    } finally {
      closeDeletePopup();
    }
  };

  if (!user)
    return <div className="text-center py-20 text-red-500">Please login to view your bookings.</div>;

  if (loading) return <div className="text-center py-20">Loading bookings...</div>;

  return (
    <section className="m-10">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
          <div>
            <Typography variant="h6" color="blue-gray">
              Your Venue Bookings
            </Typography>
            <Typography variant="small" className="text-gray-600 font-normal mt-1">
              Manage your venue bookings with ease.
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll !px-0 py-2">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head, customStyle }) => (
                  <th key={head} className={`border-b border-gray-300 !p-4 pb-4 ${customStyle}`}>
                    <Typography color="blue-gray" variant="small" className="!font-bold">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                const isLast = index === bookings.length - 1;
                const classes = isLast ? "!p-4" : "!p-4 border-b border-gray-300";
                return (
                  <tr key={booking._id}>
                    <td className={classes}>
                      {booking.venue.images?.length > 0 ? (
                        <img
                          src={`${backendURL}${booking.venue.images[0]}`}
                          alt={booking.venue.name}
                          className="border rounded-md p-1 h-12 w-16 object-cover"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="!font-semibold">
                        {booking.venue.name}
                      </Typography>
                    </td>
                    <td className={`${classes} text-right`}>
                      <Typography variant="small" className="!font-normal text-gray-600">
                        Rs {booking.venue.price}
                      </Typography>
                    </td>
                    <td className={`${classes} text-right`}>
                      <Typography variant="small" className="!font-normal text-gray-600">
                        {booking.venue.capacity} People
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="!font-normal text-gray-600">
                        {booking.venue.location}
                      </Typography>
                    </td>
                    <td className={`${classes} text-right`}>
                      <Typography variant="small" className="!font-normal text-gray-600">
                        {new Date(booking.bookingDate).toLocaleString()}
                      </Typography>
                    </td>
                    <td className={`${classes} text-right`}>
                      <div className="flex items-center justify-end gap-2">
                        {statusIcon[booking.status]}
                        <Typography variant="small" className="!font-bold text-blue-gray-700">
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Typography>
                      </div>
                    </td>
                    <td className={`${classes} text-center`}>
                      {booking.status === "pending" && (
                        <Button onClick={() => openDeletePopup(booking._id)} color="red" size="sm" className="px-4">
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Cancel Confirmation Popup */}
      {deletePopup.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="flex justify-between mt-4">
              <button onClick={closeDeletePopup} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleCancelBooking} className="bg-red-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
