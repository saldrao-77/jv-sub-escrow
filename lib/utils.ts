import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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

// Unified form submission function
export function saveFormSubmission(data: any) {
  try {
    // Add basic metadata
    const submissionData = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: "pending",
      notes: "",
      // Simple device detection
      device: data.device || getDeviceType(),
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

    console.log("✅ Saved submission to localStorage:", submissionData)
    return true
  } catch (err) {
    console.error("❌ Error saving submission:", err)
    return false
  }
}

// Keep Zapier integration unchanged
export async function submitToZapier(data: any) {
  try {
    console.log("📤 Submitting to Zapier:", data)

    // Use a try-catch specifically for the fetch operation
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

  // Save to localStorage first
  const savedLocally = saveFormSubmission(data)

  // Then try Zapier, but continue even if it fails
  try {
    await submitToZapier(data)
  } catch (error) {
    console.error("Error submitting to Zapier:", error)
    // Continue execution even if Zapier fails
  }

  return savedLocally
}
