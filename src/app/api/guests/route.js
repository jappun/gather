import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';


// create guest
export async function POST(req) {
    try {
        const { eventID, guestName, isHost } = await req.json();

        // add the guest
        const {data: newGuest, error} = await supabase
        .from('guests')
        .insert([{
            event_id: eventID,
            name: guestName,
            is_host: isHost
        }])
        .select()
        .single();

        if (error) throw error;

        // updates the events table if we just made a host
        if (isHost) {
            const {error: eventError} = await supabase
            .from('events')
            .update({host_id : newGuest.id})
            .eq('id', eventID);

            if (eventError) throw error;
        }

        return NextResponse.json(newGuest);

    } catch (error) {
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
          );

    }
}
