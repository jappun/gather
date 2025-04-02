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
// gets all guests for an event, using event_id
export async function getGuests(e_id) {
    const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("event_id", e_id);
    
    if (error) {
        console.error('Error fetching guests:', error);
        return null;
    }
    
    return data || [];
}

// adds guest
export async function addGuest(eventID, guestName, isHost = false) {
    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventID,
          guestName,
          isHost
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add guest');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding guest:', error);
      throw error;
    }
  }

