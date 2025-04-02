"use client";
import { supabase } from '@/libs/supabaseClient';
import { notFound } from 'next/navigation';
import EventHeader from '@/components/EventHeader';
import TaskList from '@/components/TaskList';
import { useEffect, useState } from 'react';
import { getEventByJoincode } from '@/libs/event-utils';
import { getTasks } from '@/libs/task-utils';
import { getGuests } from '@/libs/guest-utils';
import ExpenseList from '@/components/ExpenseList';
import GuestList from '@/components/GuestList';

export default function Event({ params }) {
    const [ event, setEvent] = useState();
    const [ guests, setGuests ] = useState([]);
    const [ tasks, setTasks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [error, setError] = useState(false);
    const joincode = params.joincode;

    useEffect( () => {
      async function fetchData() {
        try {
          const fetchedEvent = await getEventByJoincode(joincode);
          if (!fetchedEvent) {
            setError(true);
            return;
          }
          const fetchedTasks = await getTasks(fetchedEvent.id);
          const fetchedGuests = await getGuests(fetchedEvent.id);
          const guestsArray = Array.isArray(fetchedGuests) ? fetchedGuests : [];

          setEvent(fetchedEvent);
          setTasks(fetchedTasks);
          setGuests(guestsArray);

        } catch (error) {
          console.error("Error fetching event data:", error);
          setError(true);
        } finally {
          setLoading(false);
        }
       
      }

      setLoading(true);
      fetchData();

    }, [joincode])

    return (
             <>
        {error ? (notFound()) :
        loading? (<div>Loading..(TODO)</div>) : // need a loading component
     (<div className="w-full min-h-screen bg-background p-4 md:p-6">
        <div className="w-full mb-6">
          <EventHeader name={event.event_name} date={event.start_date}/>
        </div>

        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="w-full md:w-[40%] mb-6 md:mb-0">
            <TaskList tasks={tasks} eventID={event.id} guests={guests}/>
          </div>
          
          <div className="w-full md:w-[60%] space-y-6">
            <GuestList guests={guests}></GuestList>
            {/* <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Guests</h2>
              <ul className="space-y-2">
                {guests.map((guest) => (
                  <li key={guest.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>{guest.name}</span>
                    {guest.is_host && (
                      <span className="text-sm bg-primary text-white px-2 py-1 rounded">Host</span>
                    )}
                  </li>
                ))}
              </ul>
            </div> */}
            
            <ExpenseList eventID={event.id} guests={guests} />
          </div>
        </div>
      </div>)} 
      </>
  );
}


  //   return (
  //       <>
  //       {error ? (notFound()) :
  //       loading? (<div>Loading..(TODO)</div>) : // need a loading component
  //       (<div class="w-full min-h-screen bg-background p-4 md:p-6">
  //         {/* <!-- Event Header --> */}
  //         <div class="w-full mb-6">
  //         <EventHeader name={event.event_name} date={event.start_date}/>
            
  //         </div>

  //         <div class="flex flex-col md:flex-row md:gap-6">
  //           {/* <!-- Tasks Column (stacks first on mobile, 60% on desktop) --> */}
  //           <div class="w-full md:w-[60%] mb-6 md:mb-0">
  //             {/* <!-- Tasks content --> */}
  //             <TaskList tasks={tasks} eventID={event.id} guests={guests}/>
  //           </div>
        
  //           {/* <!-- Guests Column (stacks second on mobile, 40% on desktop) --> */}
  //           <div class="w-full md:w-[40%]">
  //             {/* <!-- Guests content --> */}
  //             <h2>Guests Attending:</h2>
  //             <ul>
  //             {guests.map((guest) => (
  //               <li key={guest.id}>
  //                 {guest.name}
  //               </li>
  //             ))}
  //             </ul>
              
  //           </div>
  //         </div>
  //       </div>)}
  //         </>

  //   );
  // }

        // const fetchEventData = async() => {
      //   const { data: event, eventError } = await supabase.from("events").select("*").eq("joincode", joincode).single()
      //   if (eventError || !event) {
      //       console.error("Error fetching event.");
      //       setError(true);
      //       notFound();
      //   } 
      //     setEvent(event);
        
    
      //   const { data: guests, guestsError } = await supabase.from("guests").select("*").eq("event_id", event.id);
      //   if (guestsError) {
      //       console.error("Error fetching guests.");
      //       setError(true);
      //   } else {
      //     setGuests(guests);
      //     const { data: tasks, tasksError } = await supabase.from("tasks").select("*").eq("event_id", event.id);
      //     if (tasksError) {
      //         console.error("Error fetching tasks.");
      //         setError(true);
      //       } else {
      //       setTasks(tasks);
      //     }
      //   }

      //   setLoading(false);

      // };

      // fetchEventData();
  