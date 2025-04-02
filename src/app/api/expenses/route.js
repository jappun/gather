import { NextResponse } from 'next/server';
import { supabase } from '@/libs/supabaseClient';

// Create expense
export async function POST(req) {
    try {
        const { eventID, description, amount, paidByGuestId } = await req.json();

        // Get all guests for this event to split the expense
        const { data: guests, error: guestsError } = await supabase
            .from('guests')
            .select('id')
            .eq('event_id', eventID);

        if (guestsError) throw guestsError;

        // Calculate split amount
        const splitAmount = amount / guests.length;

        // Create the expense
        const { data: expense, error: expenseError } = await supabase
            .from('expenses')
            .insert([{
                event_id: eventID,
                description,
                amount,
                paid_by: paidByGuestId,
                split_amount: splitAmount
            }])
            .select()
            .single();

        if (expenseError) throw expenseError;

        // Create expense shares for each guest
        const shares = guests.map(guest => ({
            expense_id: expense.id,
            guest_id: guest.id,
            amount: splitAmount,
            is_paid: guest.id === paidByGuestId // Mark as paid for the person who paid
        }));

        const { error: sharesError } = await supabase
            .from('expense_shares')
            .insert(shares);

        if (sharesError) throw sharesError;

        return NextResponse.json(expense);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// Get expenses for an event
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get('eventId');

        const { data, error } = await supabase
            .from('expenses')
            .select(`
                *,
                paid_by_guest:guests!expenses_paid_by_fkey(name),
                expense_shares(
                    amount,
                    is_paid,
                    guest:guests(name)
                )
            `)
            .eq('event_id', eventId);

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}