import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// mark as complete/pending
export async function PATCH(req) {
    try {
        const { taskID } = await req.json();

        // First query to get current state
        const {data: task, error: fetchError} = await supabase
        .from('tasks')
        .select('complete')
        .match({ id: taskID })  // match comes after select
        .single();

        if (fetchError) throw fetchError;

        const newCompleteness = !task.complete;  // simplified the toggle logic

        // Second query to update
        const {data, error} = await supabase
        .from('tasks')
        .update({ complete: newCompleteness })  // update comes first
        .match({ id: taskID })  // then match
        .select()  // then select
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