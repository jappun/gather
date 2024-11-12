"use client"

export default function NewEvent() {
    
    return (

    <div className="min-h-screen bg-background p-12 flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
    <div className="w-3/4 bg-secondary-two rounded-lg shadow-lg p-8">

      <form className="flex flex-col text-primary text-lg font-extrabold space-y-6">
\
        <div className="space-y-2">
          <p>Title:</p>
          <input
            type="text"
            id="event-name"
            placeholder="My Event"
            className="font-normal text-secondary-two shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="space-y-2">
          <p>Host Name:</p>
          <input
            type="text"
            id="host-name"
            placeholder="My Name"
            className="font-normal text-secondary-two shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="space-y-2">
          <p>Date:</p>
          <input
            type="date"
            id="event-date"
            placeholder="Event Date"
            onClick={(e) => e.target.showPicker()}
            className="font-normal  text-secondary-two shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
      type="submit"
      className="w-1/6 inline-flex justify-center rounded-md border border-transparent bg-primary px-8 py-1 text-sm font-medium text-white hover:bg-primary-two">
        Create
    </button>

    </form>

    </div>
  </div>
    );
}