'use client';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet
import Link from 'next/link';
import { useUser } from '@clerk/nextjs'; // Import the useUser hook
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

// Custom marker icon for Leaflet
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MainPage() {
  const [rideRequested, setRideRequested] = useState(false);
  const [carType, setCarType] = useState('Auto');
  const [estimatedPrice, setEstimatedPrice] = useState(500);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeSection] = useState('bookRide'); // Manages the active section
  const { isSignedIn } = useUser(); // Check if the user is signed in

  const defaultPosition = [24.8607, 67.0011]; // Default position (Karachi)

  const handleRideSubmit = (e) => {
    e.preventDefault();
    
    // Check if user is signed in
    if (!isSignedIn) {
      alert("You must be signed in to book a ride.");
      return;
    }

    // Validate pickup and destination
    if (!pickup || !destination) {
      alert("Please fill in both the pickup and destination fields.");
      return;
    }

    setRideRequested(true);
    let price = 500; // base price for Auto
    if (carType === 'Economy') price = 700;
    if (carType === 'Comfort') price = 1000;
    setEstimatedPrice(price);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-700 via-blue-800 to-purple-700 p-4 text-white flex justify-between items-center shadow-xl">
        <div className="text-3xl font-extrabold">
          <Link href="/" className="hover:text-yellow-400 transition duration-300 ease-in-out">MBZ Ride</Link>
        </div>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
            <button
              className="bg-green-500 px-6 py-3 rounded-full shadow-lg hover:bg-green-400 transition duration-300 ease-in-out"
            >
              Become a Driver
            </button>
        </div>
      </nav>

      {/* Book a Ride Section */}
      <br />
      {activeSection === 'bookRide' && !rideRequested && (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto p-10 bg-white shadow-xl rounded-lg">
          <form className="space-y-8" onSubmit={handleRideSubmit}>
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Book Your Ride</h1>

            <div className="flex items-center space-x-4">
              <label className="block text-gray-700 text-xl font-semibold">Car Type:</label>
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-500 text-blue-600 shadow-md"
              >
                <option value="Economy">Economy 🚗</option>
                <option value="Comfort">Comfort 🚙</option>
                <option value="Auto">Auto 🛺</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-xl font-semibold mb-3">Pickup Location</label>
              <input
                type="text"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required // Mark as required
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-500 text-blue-600 shadow-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-xl font-semibold mb-3">Destination Location</label>
              <input
                type="text"
                placeholder="Enter destination location"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required // Mark as required
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-500 text-blue-600 shadow-md"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              Request Ride
            </button>
          </form>

          {/* Map Section */}
          <div className="h-96 lg:h-auto">
            <MapContainer
              center={defaultPosition}
              zoom={12}
              className="h-full w-full rounded-lg shadow-lg"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* Pickup Marker */}
              {pickup && (
                <Marker position={defaultPosition} icon={markerIcon}>
                  <Popup>{pickup}</Popup>
                </Marker>
              )}
              {/* Destination Marker */}
              {destination && (
                <Marker position={defaultPosition} icon={markerIcon}>
                  <Popup>{destination}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      )}

      {/* Ride Confirmation */}
      {rideRequested && (
        <div className="p-10 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Ride Requested Successfully!</h2>
          <p className="text-xl text-blue-500">Your estimated price for a {carType} ride is <span className="font-bold">{estimatedPrice} PKR</span>.</p>
        </div>
      )}
    </div>
  );
}
