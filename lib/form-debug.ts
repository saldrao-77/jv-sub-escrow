// Form submission debugging utilities

export function debugFormSubmission() {
  if (typeof window === "undefined") return

  // Check localStorage availability
  try {
    localStorage.setItem("form_debug_test", "test")
    localStorage.removeItem("form_debug_test")
    console.log("✅ localStorage is available and working")
  } catch (e) {
    console.error("❌ localStorage is not available:", e)
    return {
      available: false,
      error: e,
    }
  }

  // Check existing submissions
  let submissions = []
  try {
    const storedData = localStorage.getItem("formSubmissions")
    if (storedData) {
      submissions = JSON.parse(storedData)
      console.log(`✅ Found ${submissions.length} stored submissions`)
    } else {
      console.log("ℹ️ No stored submissions found")
    }
  } catch (e) {
    console.error("❌ Error parsing stored submissions:", e)
  }

  // Test saving a dummy submission
  try {
    const testData = {
      name: "Test User",
      email: "test@example.com",
      company: "Test Company",
      properties: "1-5",
      source: "debug",
      url: window.location.href,
    }

    // Import the saveFormSubmission function
    const { saveFormSubmission } = require("@/lib/utils")

    // Try to save the test submission
    const result = saveFormSubmission(testData)

    if (result) {
      console.log("✅ Test submission saved successfully")

      // Clean up the test submission
      try {
        const storedData = localStorage.getItem("formSubmissions")
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          const filteredData = parsedData.filter((item: any) => item.source !== "debug")
          localStorage.setItem("formSubmissions", JSON.stringify(filteredData))
          console.log("✅ Test submission cleaned up")
        }
      } catch (e) {
        console.error("❌ Error cleaning up test submission:", e)
      }
    } else {
      console.error("❌ Failed to save test submission")
    }
  } catch (e) {
    console.error("❌ Error testing submission:", e)
  }

  return {
    available: true,
    submissions,
  }
}

// Add this to window for easy debugging in console
if (typeof window !== "undefined") {
  ;(window as any).debugFormSubmission = debugFormSubmission
}
