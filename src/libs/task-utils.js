import { supabase } from "./supabaseClient"

export async function updateTaskStatus(taskID) {
    const res = await fetch('/api/tasks/status', {
        method: 'PATCH',
        body: JSON.stringify({taskID})
    });
}

// gets all the tasks for a given event
export async function getTasks(e_id) {
    const { data, error} = await supabase
    .from("tasks")
    .select("*")
    .eq("event_id", e_id)

    if (error) {
        console.error("Error fetching tasks");
        return null;
    }

    return data;
};