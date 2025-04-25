// Get UTM parameters from URL
export function getUtmParams() {
  if (typeof window === "undefined") {
    return { utmSource: "", utmMedium: "", utmCampaign: "" }
  }

  const urlParams = new URLSearchParams(window.location.search)

  return {
    utmSource: urlParams.get("utm_source") || "",
    utmMedium: urlParams.get("utm_medium") || "",
    utmCampaign: urlParams.get("utm_campaign") || "",
  }
}

// Check if user is on mobile
export function isMobileDevice() {
  if (typeof window === "undefined") {
    return false
  }

  return /mobile|android|iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase())
}

// Check if the current page was accessed from the hero form
export function isFromHeroForm() {
  if (typeof window === "undefined") {
    return false
  }

  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get("from") === "hero"
}
