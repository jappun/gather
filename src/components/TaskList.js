"use client";
import Task from "@/components/Task"
import NewTaskModal from "./NewTaskModal";
import { useState } from "react";

const TaskList = ({ tasks }) => {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  return (
    <div className="p-4 border-primary border-4 rounded-lg shadow-lg">
      <h2 className="text-lg text-secondary-two font-bold mb-4">Task List</h2>
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task task={task}></Task>
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
          />}
    </div>
  );
};

export default TaskList;
