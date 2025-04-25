import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase, type FormSubmission } from "./supabase"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple device detection - no complex logic
export function getDeviceType() {
  if (typeof window === "undefined") return "desktop"
  return window.innerWidth < 768 ? "mobile" : "desktop"
}

// Check if the device is mobile
export function isMobileDevice() {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

// Save form submission to Supabase
export async function saveFormSubmission(data: any, deviceType: string) {
  try {
    // Create submission with explicit device type
    const submissionData: FormSubmission = {
      name: data.name,
      email: data.email,
      company: data.company,
      properties: data.properties,
      source: data.source || "unknown",
      device: deviceType,
      status: "pending",
      date: new Date().toISOString(),
      notes: data.notes || "",
      url: data.url || window.location.href,
    }

    console.log(`Saving submission with device type: ${deviceType}`, submissionData)

    // Save to Supabase
    const { data: savedData, error } = await supabase.from("form_submissions").insert(submissionData).select()

    if (error) {
      console.error("❌ Error saving to Supabase:", error)

      // Fallback to localStorage if Supabase fails
      saveToLocalStorage(submissionData)
      return true // Return true anyway to not disrupt user experience
    }

    console.log("✅ Saved submission to Supabase:", savedData)
    return true
  } catch (err) {
    console.error("❌ Error saving submission:", err)

    // Fallback to localStorage
    saveToLocalStorage(data)
    return true // Return true anyway to not disrupt user experience
  }
}

// Fallback function to save to localStorage
function saveToLocalStorage(data: any) {
  try {
    // Add an ID if it doesn't have one
    const submissionData = {
      ...data,
      id: data.id || Date.now().toString(),
    }

    // Get existing submissions
    let existingSubmissions = []
    try {
      const storedData = localStorage.getItem("formSubmissions")
      existingSubmissions = storedData ? JSON.parse(storedData) : []

      // Validate that we got an array
      if (!Array.isArray(existingSubmissions)) {
        console.error("Stored submissions is not an array, resetting to empty array")
        existingSubmissions = []
      }
    } catch (err) {
      console.error("Error parsing stored submissions:", err)
      existingSubmissions = []
    }

    // Add new submission and save
    const updatedSubmissions = [...existingSubmissions, submissionData]
    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))

    console.log("✅ Saved submission to localStorage as fallback:", submissionData)
  } catch (err) {
    console.error("❌ Error saving to localStorage:", err)
  }
}

// Keep Zapier integration unchanged
export async function submitToZapier(data: any) {
  try {
    console.log("📤 Submitting to Zapier:", data)

    try {
      const response = await fetch("https://hooks.zapier.com/hooks/catch/22588169/2xewy7p/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.error(`Zapier webhook failed with status: ${response.status}`)
        return false
      }

      console.log("✅ Zapier webhook fired successfully")
      return true
    } catch (fetchError) {
      console.error("❌ Fetch error when submitting to Zapier:", fetchError)
      return false
    }
  } catch (error) {
    console.error("❌ Error preparing Zapier submission:", error)
    return false
  }
}

// Unified form handler for all forms
export async function handleFormSubmission(formData: any, source: string) {
  // Create submission data
  const data = {
    ...formData,
    source,
    device: getDeviceType(),
    submittedAt: new Date().toISOString(),
  }

  // Save to Supabase first
  const savedLocally = await saveFormSubmission(data, getDeviceType())

  // Then try Zapier, but continue even if it fails
  try {
    await submitToZapier(data)
  } catch (error) {
    console.error("Error submitting to Zapier:", error)
    // Continue execution even if Zapier fails
  }

  return savedLocally
}
