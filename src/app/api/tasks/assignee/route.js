import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PATCH(req) {
    try {
        const { taskID, guestID } = await req.json();
        
        const { data, error } = await supabase
            .from('tasks')
            .update({ assignee: guestID })
            .match({ id: taskID })  // use match instead of eq
            .select()
            .single();
        
        if (error) throw error;
        
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
    }
}