import { useState} from "react";

const CreateEvent = ({ eventName, guestName, startDate}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newEvent, setNewEvent] = useState(null);
    const [newGuest, setNewGuest] = useState(null);


  const createEvent = async () => {
    setLoading(true);
    setError(null);

    try {
      const eventData = {
        eventName,
        startDate
      };

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.statusText}`);
    }

    const data = await response.json();
    setNewEvent(data);
    console.log('New event created:', data);
    return data; // Return the data for handleSubmit
    } catch (error) {
        console.error('Error creating event:', error);
        setError(error.message);
        throw error;
    }
};



const createHost = async (eventID) => {
    setLoading(true);
    setError(null);

    try {
        const hostData = {
            guestName,
            eventID,
            isHost: true
        };

        const response = await fetch('api/guests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hostData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error: ${response.statusText}`);
        }
    
        const data = await response.json();
        setNewGuest(data);
        console.log('New host created:', data);
        return data; 


    } catch (error) {
        console.error('Error creating host:', error);
        setError(error.message);
        throw error;
    }
};

// const openEventPage = () => {

// }


const handleSubmit = async () => {
    try {
        const eventResult = await createEvent();
        if (eventResult) {
            await createHost()
        }
    } catch (error) {
        console.log('Failed to complete event creation process');
    } finally {
        setLoading(false);
        // openEventPage(); if newGuest and newEvent
    }
}

    return (
        <button
        type="submit"
        onClick={handleSubmit}
        disabled={ !eventName || !startDate || !guestName}
        className="disabled:bg-gray-300 w-1/6 inline-flex justify-center rounded-md border border-transparent bg-primary px-8 py-1 text-sm font-medium text-white hover:bg-primary-two">
            {loading ? 'Creating...' : 'Create'}
        </button>
    );
}

export default CreateEvent;
