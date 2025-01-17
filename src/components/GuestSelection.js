"use client"
import { useState } from "react";

export function GuestSelection({ guests, callback }) {
  const [selectedGuest, setSelectedGuest] = useState("");

  const handleChange = (e) => {
    const guestId = e.target.value;
    console.log("Selected guest ID:", guestId);
    setSelectedGuest(guestId);
    callback(guestId);
  }

  return (
    <select
      className="w-full p-2 border rounded"
      value={selectedGuest}
      onChange={handleChange}
    >
      <option value="">Select a guest</option>
      {guests.map(guest => (
        <option key={guest.id} value={guest.id}>
          {guest.name}
        </option>
      ))}
    </select>
  );
}

export default GuestSelection;