"use client";
import { supabase } from '@/libs/supabaseClient';
import { notFound } from 'next/navigation';
import EventHeader from '@/components/EventHeader';
import TaskList from '@/components/TaskList';
import { useEffect, useState } from 'react';


export default function Event({ params }) {
    const [ event, setEvent] = useState(null);
    const [ guests, setGuests ] = useState([]);
    const [ tasks, setTasks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [error, setError] = useState(false);
    const joincode = params.joincode;

    useEffect( () => {
      const fetchEventData = async() => {
        const { data: event, eventError } = await supabase.from("events").select("*").eq("joincode", joincode).single()
        if (eventError || !event) {
            console.error("Error fetching event.");
            setError(true);
            notFound();
        } 
          setEvent(event);
        
    
        const { data: guests, guestsError } = await supabase.from("guests").select("*").eq("event_id", event.id);
        if (guestsError) {
            console.error("Error fetching guests.");
            setError(true);
        } else {
          setGuests(guests);
          const { data: tasks, tasksError } = await supabase.from("tasks").select("*").eq("event_id", event.id);
          if (tasksError) {
              console.error("Error fetching tasks.");
              setError(true);
            } else {
            setTasks(tasks);
          }
        }

        setLoading(false);

      };

      fetchEventData();
  
    }, [])


    return (
        <>
        {error ? (notFound()) :
        loading? (<div>Loading..(TODO)</div>) : // need a loading component
        (<div class="w-full min-h-screen bg-background p-4 md:p-6">
          {/* <!-- Event Header --> */}
          <div class="w-full mb-6">
          <EventHeader name={event.event_name} date={event.start_date}/>
            
          </div>

          <div class="flex flex-col md:flex-row md:gap-6">
            {/* <!-- Tasks Column (stacks first on mobile, 60% on desktop) --> */}
            <div class="w-full md:w-[60%] mb-6 md:mb-0">
              {/* <!-- Tasks content --> */}
              <TaskList tasks={tasks} />
            </div>
        
            {/* <!-- Guests Column (stacks second on mobile, 40% on desktop) --> */}
            <div class="w-full md:w-[40%]">
              {/* <!-- Guests content --> */}
              <h2>Guests Attending:</h2>
              <ul>
              {guests.map((guest) => (
                <li key={guest.id}>
                  {guest.name}
                </li>
              ))}
              </ul>
              
            </div>
          </div>
        </div>)}
          </>

    );
  }
