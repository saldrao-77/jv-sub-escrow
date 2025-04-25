import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

// Zapier webhook URL
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22588169/2xewy7p/"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Create submission object with timestamp
    const submission = {
      ...data,
      created_at: new Date().toISOString(),
      status: "new",
    }

    // 1. Store in Supabase
    let supabaseSuccess = false
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.from("jv_sub_e").insert([submission])

      if (!error) {
        supabaseSuccess = true
        console.log("✅ Submission saved to Supabase")
      } else {
        console.error("❌ Supabase error:", error)
      }
    } catch (dbError) {
      console.error("❌ Database error:", dbError)
    }

    // 2. Send to Zapier (even if Supabase fails)
    let zapierSuccess = false
    try {
      const zapierResponse = await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      })

      if (zapierResponse.ok) {
        zapierSuccess = true
        console.log("✅ Zapier webhook triggered successfully")
      } else {
        console.error(`❌ Zapier webhook failed with status: ${zapierResponse.status}`)
      }
    } catch (zapierError) {
      console.error("❌ Zapier webhook error:", zapierError)
    }

    // Return success if either Supabase or Zapier succeeded
    return NextResponse.json({
      success: supabaseSuccess || zapierSuccess,
      supabaseSuccess,
      zapierSuccess,
    })
  } catch (error) {
    console.error("❌ General error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
