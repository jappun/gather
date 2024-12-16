import { supabase } from "./supabaseClient"

export async function fetchGuestByID(guestID) {
    const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", guestID)
    .single();

    if (error) {
        console.error("Error fetching guests in libs");
    }

    return data;

}

export async function getAllGuests(joinCode) {
    const { eventData, eventError } = await supabase
    .from("events")
    .select("id")
    .eq("joincode", joinCode)
    .single()

    if (eventError) {
        console.error("Error fetching event");
    }

    const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("event_id", eventData.id)

    if (error) {
        console.error("Error fetching guests");
    }

    return data;
}