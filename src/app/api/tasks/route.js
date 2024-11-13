import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// create a task
export async function POST(req) {
    try {
        const { eventID, taskName } = await req.json();

        const { data: newTask, error } = await supabase
        .from('tasks')
        .insert([{
            event_id: eventID,
            name: taskName
        }])
        .select()
        .single();

        if (error) throw error;
        
        return NextResponse.json(newTask);

    } catch (error) { 
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
          );
    }
}



// get all tasks for one event
// export async function GET(req) {
//     try {
// get joincode from url and then use that to get the event id
//         const { eventID } = await req.json()

//         const { data, error } = await supabase
//         .from('tasks')
//         .eq('event_id', eventID)
//         .select('*')

//         if (error) throw error

//         return NextResponse.json(data)


//     } catch (error) {
//         return NextResponse.json(
//             { error: error.message }, 
//             { status: 500 }
//           ) 
//     }
// }