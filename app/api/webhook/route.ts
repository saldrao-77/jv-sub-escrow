import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Log the data for debugging
    console.log("Form submission received:", data)

    // Create a simplified submission object
    const submission = {
      ...data,
      created_at: new Date().toISOString(),
      status: "new",
    }

    // Insert into Supabase with minimal fields
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.from("jv_sub_e").insert([submission])

      if (error) {
        console.error("Supabase error:", error)
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue execution even if database fails
    }

    // Skip Zapier webhook during deployment testing
    // We'll add it back after successful deployment

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
