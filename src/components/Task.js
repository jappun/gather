"use client"
import { fetchGuestByID } from "@/libs/guest-utils";
import { useEffect, useState } from "react";
import { updateTaskStatus } from "@/libs/task-utils";

const Task = ({task}) => {
        // guest id is attached to the task under "assignee"
        // need to get it from the supabase table "guests"
        const [guest, setGuest] = useState("");
        const [isComplete, setIsComplete] = useState(task.complete);

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

        const handleCheck = async () => {
          try {
            setIsComplete(!isComplete);
            await updateTaskStatus(task.id);
          } catch {
            setIsComplete(task.complete);
            console.error("Failed to update task")
          }
        }

    
        return (
            <div className={`flex items-center justify-between p-3 bg-white text-secondary-two rounded-lg shadow-sm border-l-4 border-white ${isComplete ? 'border-l-secondary' : 'border-l-primary-two' }`}>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  checked={isComplete}
                  onChange={handleCheck}
                  className="h-5 w-5 rounded accent-secondary"
                />
                <span className={isComplete ? "text-gray-500 line-through" : ""}>
                  {task.name}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mr-4">
                {/* Assignee - could be avatar or name */}
                <div className="text-sm text-secondary-two">
                  {guest} 
                </div>
                <button>
                <svg viewBox="0 0 24 24" height="20px" width="20px" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#115E59"></path></g></svg>               
                 {/* <svg fill="#115E59" height="15px" width="15px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.637 306.637" stroke="#115E59"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"></path> <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg> */}
                </button>
                
                
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