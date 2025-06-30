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
  { head: "User", customStyle: "text-left" },
  { head: "Email", customStyle: "text-left" },
  { head: "Phone", customStyle: "text-left" },
  { head: "Status", customStyle: "text-center" },
  { head: "Actions", customStyle: "text-center" },
];

const statusIcon = {
  approved: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  pending: <ClockIcon className="h-5 w-5 text-yellow-500" />,
  canceled: <XCircleIcon className="h-5 w-5 text-red-500" />,
};

function Orders() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/bookings`, {
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

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${backendURL}/api/bookings/${bookingId}/approve`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      toast.success(`Booking status updated to ${newStatus}`);
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update status.");
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`${backendURL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Booking deleted successfully.");
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete booking.");
    }
  };

  if (!user) return <div className="text-center py-20 text-red-500">Please login as admin.</div>;
  if (loading) return <div className="text-center py-20">Loading bookings...</div>;

  return (
    <section className="m-10">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
          <div>
            <Typography variant="h6" color="blue-gray">
              Venue Bookings
            </Typography>
            <Typography variant="small" className="text-gray-600 font-normal mt-1">
              Manage all venue bookings.
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
                      {booking.venue?.images?.length > 0 ? (
                        <img
                          src={`${backendURL}${booking.venue.images[0]}`}
                          alt={booking.venue?.name || "Venue Image"}
                          className="border rounded-md p-1 h-12 w-16 object-cover"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className={classes}>{booking.venue?.name || "Unknown Venue"}</td>
                    <td className={classes}>{booking.user?.username || "Unknown User"}</td>
                    <td className={classes}>{booking.user?.email || "No Email"}</td>
                    <td className={classes}>{booking.user?.phone || "No Phone"}</td>
                    <td className={`${classes} text-center`}>
                      <div className="flex items-center justify-center gap-2">
                        {statusIcon[booking.status]}
                        <Typography variant="small" className="!font-bold">
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Typography>
                      </div>
                    </td>
                    <td className={`${classes} text-center`}>
                      <Button
                        onClick={() => updateStatus(booking._id, "approved")}
                        color="green"
                        size="sm"
                        className="px-3 mx-1"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => updateStatus(booking._id, "canceled")}
                        color="red"
                        size="sm"
                        className="px-3 mx-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => deleteBooking(booking._id)}
                        color="red"
                        size="sm"
                        className="px-3 mx-1"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </section>
  );
}

export default Orders;
