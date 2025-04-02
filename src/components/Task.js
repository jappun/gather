"use client"
import { fetchGuestByID } from "@/libs/guest-utils";
import { useEffect, useState } from "react";
import { updateTaskStatus } from "@/libs/task-utils";

// export default Task;
const Task = ({task: initialTask}) => {
  const [task, setTask] = useState(initialTask);
  const [guest, setGuest] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchGuest = async () => {
          if (task.assignee) {
              try {
                  const guestData = await fetchGuestByID(task.assignee);
                  setGuest(guestData?.name || "Unassigned");
              } catch (error) {
                  console.error("Error fetching guests in comp", error);
                  setGuest("Unassigned");
              }
          }
      };
      fetchGuest();
  }, [task.assignee]);

  const handleCheck = async () => {
      setError(null);
      const previousState = task.complete;
      
      // Optimistic update
      setTask(prev => ({
          ...prev,
          complete: !prev.complete
      }));

      try {
          const response = await fetch('/api/tasks/status', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  taskID: task.id
              }),
          });

          if (!response.ok) {
              throw new Error('Failed to update task status');
          }

          const updatedTask = await response.json();
          setTask(updatedTask);

      } catch (error) {
          console.error("Failed to update task", error);
          // Revert optimistic update
          setTask(prev => ({
              ...prev,
              complete: previousState
          }));
          setError("Failed to update task status. Please try again.");
      }
  };

  return (
      <div className="space-y-2">
          <div className={`flex items-center justify-between p-3 bg-white text-secondary-two rounded-lg shadow-sm border-l-4 border-white ${
              task.complete ? 'border-l-secondary' : 'border-l-primary-two'
          }`}>
              <div className="flex items-center gap-3">
                  <input 
                      type="checkbox"
                      checked={task.complete}
                      onChange={handleCheck}
                      className="h-5 w-5 rounded accent-secondary"
                  />
                  <span className={task.complete ? "text-gray-500 line-through" : ""}>
                      {task.name}
                  </span>
              </div>
              
              <div className="flex items-center gap-4 mr-4">
                  <div className="text-sm text-secondary-two">
                      {guest || "Unassigned"} 
                  </div>
                  {/* <button>
                      <svg viewBox="0 0 24 24" height="20px" width="20px" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#115E59"/>
                      </svg>
                  </button>
                  <button>
                    <svg width="20px" height="20px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#0F5E59" stroke="#0F5E59"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>trash</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch="MSPage"> <g id="Icon-Set" sketch="MSLayerGroup" transform="translate(-259.000000, -203.000000)" fill="#0F5E59"> <path d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z" id="trash" sketch="MSShapeGroup"> </path> </g> </g> </g></svg>
                  </button> */}
              </div>
          </div>
          {error && (
              <div className="text-red-500 text-sm px-3">
                  {error}
              </div>
          )}
      </div>
  );
};
export default Task;