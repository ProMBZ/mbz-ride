import React from 'react';

export default function BecomeDriverPage() {
  return (
    <div className="p-10 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6">Become a Driver</h1>
      <form>
        {/* Add your form fields for becoming a driver here */}
        <div>
          <label className="block text-gray-700 text-xl font-semibold mb-3">Name</label>
          <input type="text" placeholder="Enter your name" className="w-full p-4 border border-gray-300 rounded" required />
        </div>
        <div>
          <label className="block text-gray-700 text-xl font-semibold mb-3">Email</label>
          <input type="email" placeholder="Enter your email" className="w-full p-4 border border-gray-300 rounded" required />
        </div>
        <div>
          <label className="block text-gray-700 text-xl font-semibold mb-3">Phone Number</label>
          <input type="tel" placeholder="Enter your phone number" className="w-full p-4 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out">
          Submit
        </button>
      </form>
    </div>
  );
}
