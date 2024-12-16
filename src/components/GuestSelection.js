"use client"
import { useState } from "react";

export function GuestSelection({guests, callback}) {
    const [selectedGuest, setSelectedGuest] = useState(null);

    const handleChange = (e) => {
        const guestID = e.target.value;
        const selected = guests.find(guest => guest.id === parseInt(guestID, 10));
        setSelectedGuest(selected);
        callback(selected);
    }

  return (
    <select
        className="w-full p-2 border rounded"
    >
        <option value="" disabled selected></option>
        {guests.map(guest => (
        <option key={guest.id} value={guest.id}>
            {guest.name}
        </option>
      ))}

    </select>
  );
}

export default GuestSelection;