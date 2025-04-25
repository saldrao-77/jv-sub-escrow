// This file contains utilities for link preview debugging

export function debugLinkPreview() {
  if (typeof window === "undefined") return

  // Log all meta tags
  const metaTags = document.querySelectorAll("meta")
  console.log("🔍 Meta tags found:", metaTags.length)

  const ogTags: Record<string, string> = {}
  const twitterTags: Record<string, string> = {}

  metaTags.forEach((tag) => {
    const property = tag.getAttribute("property")
    const name = tag.getAttribute("name")
    const content = tag.getAttribute("content")

    if (property?.startsWith("og:") && content) {
      ogTags[property] = content
    }

    if (name?.startsWith("twitter:") && content) {
      twitterTags[name] = content
    }
  })

  console.log("📊 OpenGraph tags:", ogTags)
  console.log("🐦 Twitter tags:", twitterTags)

  // Check for common issues
  if (!ogTags["og:title"]) console.warn("⚠️ Missing og:title")
  if (!ogTags["og:description"]) console.warn("⚠️ Missing og:description")
  if (!ogTags["og:image"]) console.warn("⚠️ Missing og:image")

  return {
    ogTags,
    twitterTags,
    hasRequiredTags: Boolean(ogTags["og:title"] && ogTags["og:description"] && ogTags["og:image"]),
  }
}

// Add this to window for easy debugging in console
if (typeof window !== "undefined") {
  ;(window as any).debugLinkPreview = debugLinkPreview
}
