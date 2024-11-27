"use client";
import Task from "@/components/Task"

const TaskList = ({ tasks }) => {
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
    </div>
  );
};

export default TaskList;
