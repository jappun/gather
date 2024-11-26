"use client"
import CreateEvent from "@/components/CreateEvent";
import { useState } from "react";

export default function NewEvent() {
  const [ eventName, setEventName ] = useState('');
  const [ startDate, setStartDate ] = useState('');
  const [ guestName, setGuestName ] = useState('');
    
    return (

    <div className="min-h-screen bg-background p-12 flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
    <div className="w-3/4 bg-secondary-two rounded-lg shadow-lg p-8">

      <form className="flex flex-col text-primary text-lg font-extrabold space-y-6">

        <div className="space-y-2">
          <p>Title:</p>
          <input
            type="text"
            placeholder="Super Cool Fun Party"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required

            className="font-normal text-secondary-two shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="space-y-2">
          <p>Host Name:</p>
          <input
            type="text"
            placeholder="Your Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            className="font-normal text-secondary-two shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="space-y-2">
          <p>Date:</p>
          <input
            type="date"
            placeholder="Event Date"
            onClick={(e) => e.target.showPicker()}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="font-normal  text-secondary-two shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <CreateEvent eventName={eventName} startDate={startDate} guestName={guestName }/>



    </form>

    </div>
  </div>
    );
}