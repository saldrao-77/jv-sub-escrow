import { NextResponse } from "next/server"
import { setupDatabase } from "@/lib/supabase"

export async function GET() {
  try {
    const success = await setupDatabase()

    if (success) {
      return NextResponse.json({ success: true, message: "Database setup complete" })
    } else {
      return NextResponse.json({ success: false, message: "Database setup failed" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in setup route:", error)
    return NextResponse.json({ success: false, message: "Database setup failed with error" }, { status: 500 })
  }
}
