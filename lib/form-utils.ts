// Form submission utilities

// Get device type
export function getDeviceType() {
  if (typeof window === "undefined") {
    return "desktop"
  }

  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase())
  return isMobile ? "mobile" : "desktop"
}

// Extract UTM parameters from URL
export function getUtmParams() {
  if (typeof window === "undefined") {
    return {
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    }
  }

  const urlParams = new URLSearchParams(window.location.search)

  return {
    utmSource: urlParams.get("utm_source") || "",
    utmMedium: urlParams.get("utm_medium") || "",
    utmCampaign: urlParams.get("utm_campaign") || "",
  }
}

// Check if user is coming from hero form
export function isFromHeroForm() {
  if (typeof window === "undefined") {
    return false
  }

  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get("from") === "hero"
}

// Store hero submission in session storage
export function storeHeroSubmission(data: any) {
  if (typeof window === "undefined") {
    return
  }

  try {
    sessionStorage.setItem(
      "heroSubmission",
      JSON.stringify({
        ...data,
        timestamp: Date.now(),
      }),
    )
  } catch (error) {
    console.error("Error storing hero submission:", error)
  }
}

// Get hero submission from session storage
export function getHeroSubmission() {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const heroSubmissionStr = sessionStorage.getItem("heroSubmission")
    if (heroSubmissionStr) {
      return JSON.parse(heroSubmissionStr)
    }
  } catch (error) {
    console.error("Error getting hero submission:", error)
  }

  return null
}

// Store last submission in session storage
export function storeLastSubmission(data: any) {
  if (typeof window === "undefined") {
    return
  }

  try {
    sessionStorage.setItem(
      "lastSubmission",
      JSON.stringify({
        ...data,
        timestamp: Date.now(),
      }),
    )
  } catch (error) {
    console.error("Error storing last submission:", error)
  }
}

// Clear hero submission from session storage
export function clearHeroSubmission() {
  if (typeof window === "undefined") {
    return
  }

  try {
    sessionStorage.removeItem("heroSubmission")
  } catch (error) {
    console.error("Error clearing hero submission:", error)
  }
}

// Submit form data to API endpoint
export async function submitFormData(formData: any) {
  try {
    const response = await fetch("/api/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Form submission error:", error)
    throw error
  }
}
