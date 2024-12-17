import { supabase } from "./supabaseClient"

export async function getEventByJoincode(joincode) {
    const { data: eventData, error: eventError} = await supabase
    .from("events")
    .select("*")
    .eq("joincode", joincode)
    .single();

    if (eventError) {
        console.error("Error fetching event");
        return null;
    }

    return eventData;
}
 