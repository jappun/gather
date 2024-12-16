import { supabase } from "./supabaseClient"

export async function updateTaskStatus(taskID) {
    const res = await fetch('/api/tasks/status', {
        method: 'PATCH',
        body: JSON.stringify({taskID})
    });
}

export async function addNewTask(name, assignee) {
    
}