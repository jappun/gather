"use client";
import Task from "@/components/Task"
import NewTaskModal from "./NewTaskModal";
import { useEffect, useState } from "react";
import { getTasks } from '@/libs/task-utils';


const TaskList = ({ tasks, eventID, guests }) => {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [updatedTasks, setUpdatedTasks] = useState(tasks) // initially updatedTasks are just tasks

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks(eventID);
      setUpdatedTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    // Refetch tasks when a new task is added
    fetchTasks();
  };

  return (
    <div className="p-4 border-primary border-4 rounded-lg shadow-lg">
      <h2 className="text-lg text-secondary-two font-bold mb-4">Task List</h2>
      <div className="space-y-3">
        {updatedTasks.length > 0 ? (
          updatedTasks.map((task) => (
            <Task key={task.id} task={task}></Task>
          ))
        ) : (
          <p className="text-gray-600">No tasks available.</p>
        )}
      </div>
      <button
         className="w-full text-xl mt-4 p-2 bg-primary text-white 
         rounded-lg hover:bg-primary-two transition-colors"
         onClick={() => setIsNewTaskModalOpen(true)}>
          +
      </button>
      {isNewTaskModalOpen &&  
        <NewTaskModal
        isNewTaskModalOpen={isNewTaskModalOpen}
        setIsNewTaskModalOpen={setIsNewTaskModalOpen}
        eventID={eventID}
        guests={guests}
        onTaskAdded={handleTaskAdded}
          />}
    </div>
  );
};

export default TaskList;
