import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

function generateJoinCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// create event
export async function POST(request) {
    try {
      const { eventName, startDate } = await request.json()

      // unique code
      let joinCode
      let isUnique = false
      while (!isUnique) {
        joinCode = generateJoinCode()
        const { data: existingCode } = await supabase
          .from('events')
          .select('id')
          .eq('joincode', joinCode)
          .single()
        
        if (!existingCode) {
          isUnique = true
        }
      }
  
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert([
          {
            event_name: eventName,
            start_date: startDate,
            host_id: null, 
            joincode: joinCode,
          }
        ])
        // selects the just inserted row to return
        .select()
         // returns row object not in array
        .single()
   
      if (error) throw error // throw error
  
      return NextResponse.json(newEvent) // return res

    } catch (error) {
      return NextResponse.json(
        { error: error.message }, 
        { status: 500 }
      )
    }
  }
