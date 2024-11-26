"use client"
import { fetchGuestByID } from "@/libs/guest-utils";
import { useEffect, useState } from "react";

const Task = ({task}) => {
        // guest id is attached to the task under "assignee"
        // need to get it from the supabase table "guests"
        const [guest, setGuest] = useState("");

        useEffect(() => {
          const fetchGuest = async () => {
            if (task.assignee) {
              try {
                const guestData = await fetchGuestByID(task.assignee);
                setGuest(guestData?.name);
              } catch (error) {
                console.error("Error fetching guests in comp", error)
                setGuest("Unassigned")
              }
            }
          }
          fetchGuest();
        }, [task.assignee]);
    
        return (
            <div className="flex items-center justify-between p-3 bg-background text-secondary-two rounded-lg shadow-sm">

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  checked={task.complete}
                  className="h-5 w-5 rounded border-gray-300"
                />
                <span className={task.complete ? "text-gray-500 line-through" : ""}>
                  {task.name}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Assignee - could be avatar or name */}
                <div className="text-sm text-gray-600">
                  {guest} 
                </div>
                
                {/* Status badge */}
                {/* <span className={`px-2 py-1 text-sm rounded-full ${
                  task.complete 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-red-700"
                }`}>
                  {task.complete ? "Complete" : "In Progress"}
                </span> */}
              </div>
            </div>
          );
}

export default Task;