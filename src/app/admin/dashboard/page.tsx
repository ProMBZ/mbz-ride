import React from 'react';

// Sample data for cards
const stats = [
  {
    title: 'Total Rides',
    value: '1,250',
    icon: '🚗',
    bgColor: 'bg-blue-500',
  },
  {
    title: 'Active Drivers',
    value: '50',
    icon: '👨‍✈️',
    bgColor: 'bg-green-500',
  },
  {
    title: 'Total Earnings',
    value: '₨ 200,000',
    icon: '💰',
    bgColor: 'bg-yellow-500',
  },
  {
    title: 'New Feedback',
    value: '10',
    icon: '📝',
    bgColor: 'bg-purple-500',
  },
];

// Sample data for ride requests
const rideRequests = [
  { id: 1, pickup: 'Downtown', destination: 'Airport', driver: 'Ali', status: 'Completed' },
  { id: 2, pickup: 'Central Park', destination: 'City Mall', driver: 'Sara', status: 'Pending' },
  { id: 3, pickup: '5th Avenue', destination: 'Hospital', driver: 'Imran', status: 'In Progress' },
];

const DashboardPage = () => {

  return (
      <div className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.title} className={`p-6 rounded-lg shadow-lg text-white ${stat.bgColor} flex flex-col items-center`}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <h2 className="text-xl font-semibold">{stat.title}</h2>
              <p className="text-2xl">{stat.value}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Ride Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Pickup Location</th>
                <th className="py-2 px-4 border-b">Destination</th>
                <th className="py-2 px-4 border-b">Driver</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {rideRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-black">{request.id}</td>
                  <td className="py-2 px-4 border-b text-black">{request.pickup}</td>
                  <td className="py-2 px-4 border-b text-black">{request.destination}</td>
                  <td className="py-2 px-4 border-b text-black">{request.driver}</td>
                  <td className="py-2 px-4 border-b text-black">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default DashboardPage;
