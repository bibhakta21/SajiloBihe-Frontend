import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { FaBox, FaCartShopping, FaSackDollar, FaUserPlus } from "react-icons/fa6";
import axios from "axios";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const DashboardHome = () => {
    const [dashboardData, setDashboardData] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalVenues: 0,
        totalCustomers: 0,
        venueBookings: [],
        weeklyBookings: [],
        bookingStatus: [],
        contactRequests: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from local storage
                const res = await axios.get("http://localhost:3000/api/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("📌 API Response:", res.data); // Debugging step
                setDashboardData(res.data);
            } catch (error) {
                console.error("❌ Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // Sales Summary Cards
    const summaryCards = [
        { id: 1, value: dashboardData?.totalSales || 0, label: "Total Sales", bgColor: "bg-red-100", icon: <FaSackDollar />, iconBgColor: "bg-red-500" },
        { id: 2, value: dashboardData?.totalOrders || 0, label: "Total Orders", bgColor: "bg-yellow-100", icon: <FaCartShopping />, iconBgColor: "bg-yellow-500" },
        { id: 3, value: dashboardData?.totalVenues || 0, label: "Total Venues", bgColor: "bg-green-100", icon: <FaBox />, iconBgColor: "bg-green-500" },
        { id: 4, value: dashboardData?.totalCustomers || 0, label: "Total Customers", bgColor: "bg-purple-100", iconBgColor: "bg-purple-500" },
    ];

    return (
        <div className="p-4">
            {loading ? (
                <p className="text-center text-gray-500">Loading data...</p>
            ) : (
                <>
                    {/* Sales Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {summaryCards.map((card) => (
                            <div key={card.id} className={`p-4 rounded-lg shadow ${card.bgColor}`}>
                                <div className={`text-sm text-white w-7 h-7 flex items-center justify-center rounded-full ${card.iconBgColor}`}>
                                    {card.icon}
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-2xl font-semibold">{card.value}</h3>
                                    <p className="text-gray-500">{card.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts in 2x2 Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Venue Booking Distribution (Pie Chart) */}
                        {dashboardData?.venueBookings?.length > 0 && (
                            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center h-[350px]">
                                <h2 className="text-md font-semibold mb-2">Venue Booking Distribution</h2>
                                <div className="w-[220px] h-[300px]"> {/* Smaller Pie Chart Container */}
                                    <Pie data={{
                                        labels: dashboardData?.venueBookings?.map(v => v.venueName || "Unknown") || [],
                                        datasets: [{
                                            data: dashboardData?.venueBookings?.map(v => v.count) || [],
                                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                                        }]
                                    }} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        )}

                        {/* Weekly Booking Count (Bar Chart) */}
                        {dashboardData?.weeklyBookings?.length > 0 && (
                            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center h-[350px]">
                                <h2 className="text-md font-semibold mb-2">Weekly Booking Count</h2>
                                <Bar data={{
                                    labels: dashboardData?.weeklyBookings?.map(w => `Week ${w._id}`) || [],
                                    datasets: [{
                                        label: "Bookings",
                                        data: dashboardData?.weeklyBookings?.map(w => w.count) || [],
                                        backgroundColor: "#6366F1",
                                    }]
                                }} options={{ maintainAspectRatio: false }} />
                            </div>
                        )}

                        {/* Booking Status (Doughnut Chart) */}
                        {dashboardData?.bookingStatus?.length > 0 && (
                            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center h-[350px]">
                                <h2 className="text-md font-semibold mb-2">Booking Status</h2>
                                <div className="w-[220px] h-[300px]"> {/* Smaller Doughnut Chart Container */}
                                    <Doughnut data={{
                                        labels: dashboardData?.bookingStatus?.map(b => b._id || "Unknown") || [],
                                        datasets: [{
                                            data: dashboardData?.bookingStatus?.map(b => b.count) || [],
                                            backgroundColor: ["#4CAF50", "#F44336"],
                                        }]
                                    }} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        )}

                        {/* Contact Requests Trends (Line Chart) */}
                        {dashboardData?.contactRequests?.length > 0 && (
                            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center h-[350px]">
                                <h2 className="text-md font-semibold mb-2">Contact Requests Trend</h2>
                                <Line data={{
                                    labels: dashboardData?.contactRequests?.map(c => `Month ${c._id}`) || [],
                                    datasets: [{
                                        label: "Contact Requests",
                                        data: dashboardData?.contactRequests?.map(c => c.count) || [],
                                        borderColor: "#FF5733",
                                        fill: false,
                                    }]
                                }} options={{ maintainAspectRatio: false }} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardHome;
