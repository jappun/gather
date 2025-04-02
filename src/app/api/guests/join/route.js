import { NextResponse } from 'next/server';
import { supabase } from '@/libs/supabaseClient';

export async function POST(req) {
    try {
        const { joincode, guestName } = await req.json();

        // First get the event ID from the joincode
        const { data: event, error: eventError } = await supabase
            .from('events')
            .select('id')
            .eq('joincode', joincode)
            .single();

        if (eventError) throw new Error('Event not found');

        // Add the guest
        const { data: newGuest, error: guestError } = await supabase
            .from('guests')
            .insert([{
                event_id: event.id,
                name: guestName,
                is_host: false
            }])
            .select()
            .single();

        if (guestError) throw guestError;

        return NextResponse.json(newGuest);
    } catch (error) {
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
    }
}