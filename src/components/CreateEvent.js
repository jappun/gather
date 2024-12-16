import { useState} from "react";
import { useRouter } from 'next/navigation';


const CreateEvent = ({ eventName, guestName, startDate}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newEvent, setNewEvent] = useState(null);
    const [newGuest, setNewGuest] = useState(null);
    const router = useRouter();



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

const openEventPage = (joincode) => {
    router.push(`/event/${joincode}`)
}

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let eventResult = null;

    try {      
        eventResult = await createEvent();
        if (eventResult && eventResult.id) {
            await createHost(eventResult.id);
        } else {
            throw new Error('Event error');
        }
    } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Unknown error');
    } finally {
        setLoading(false);
        if (eventResult.joincode) {
            openEventPage(eventResult.joincode);
        }
    }
};

    return (
        <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        disabled={ !eventName || !startDate || !guestName}
        className="disabled:bg-gray-300 w-1/6 inline-flex justify-center rounded-md border border-transparent bg-primary px-8 py-1 text-sm font-medium text-white hover:bg-primary-two">
            {loading ? 'Creating...' : 'Create'}
        </button>
    );
}

export default CreateEvent;
