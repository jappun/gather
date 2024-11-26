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