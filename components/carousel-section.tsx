"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { CreditCard, Smartphone, Receipt, Activity, ChevronRight, ChevronLeft } from "lucide-react"

const carouselItems = [
  {
    id: "escrow-setup",
    icon: <CreditCard className="h-6 w-6" />,
    emoji: "🔒",
    title: "Send Quote with Escrow",
    description:
      "Create a materials quote and send it with a secure escrow payment link. Your customer funds the escrow account upfront, giving you immediate access to the funds you need to start the job.",
    images: ["/images/quote.png", "/images/text.png"],
  },
  {
    id: "card-issuance",
    icon: <Smartphone className="h-6 w-6" />,
    emoji: "💳",
    title: "Access Funds Your Way",
    description:
      "Choose how to access your escrow funds—direct transfer, virtual card, or physical card. Set spending limits and vendor restrictions that work for your job while giving customers peace of mind.",
    images: ["/images/card.png", "/images/vard.png"],
  },
  {
    id: "vendor-verification",
    icon: <Receipt className="h-6 w-6" />,
    emoji: "✅",
    title: "Buy Materials & Track Expenses",
    description:
      "Purchase materials when you need them without fronting costs. Simply snap a photo of receipts via text, and our system automatically matches them to transactions, creating a clean record for you and your customer.",
    images: ["/images/card-plus-2.png"],
  },
  {
    id: "expense-tracking",
    icon: <Activity className="h-6 w-6" />,
    emoji: "📊",
    title: "Complete More Jobs Faster",
    description:
      "With upfront funding and no payment disputes, you can focus on the work instead of chasing money. Complete jobs faster, build customer trust, and grow your business with a steady cash flow.",
    images: ["/images/expense.png"],
  },
]

export function CarouselSection() {
  const [activeItem, setActiveItem] = useState(carouselItems[0].id)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-rotate carousel items
  useEffect(() => {
    const rotateItems = () => {
      setActiveItem((current) => {
        const currentIndex = carouselItems.findIndex((item) => item.id === current)
        const currentItem = carouselItems[currentIndex]

        // If the current item has multiple images and we're not on the last one
        if (currentItem.images.length > 1 && activeImageIndex < currentItem.images.length - 1) {
          setActiveImageIndex(activeImageIndex + 1)
          return current
        } else {
          // Move to the next item and reset image index
          setActiveImageIndex(0)
          const nextIndex = (currentIndex + 1) % carouselItems.length
          return carouselItems[nextIndex].id
        }
      })
    }

    intervalRef.current = setInterval(rotateItems, 4000) // Change every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeItem, activeImageIndex])

  // Handle manual item selection
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId)
    setActiveImageIndex(0)

    // Reset the interval timer when manually changing items
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setActiveItem((current) => {
          const currentIndex = carouselItems.findIndex((item) => item.id === current)
          const currentItem = carouselItems[currentIndex]

          if (currentItem.images.length > 1 && activeImageIndex < currentItem.images.length - 1) {
            setActiveImageIndex(activeImageIndex + 1)
            return current
          } else {
            setActiveImageIndex(0)
            const nextIndex = (currentIndex + 1) % carouselItems.length
            return carouselItems[nextIndex].id
          }
        })
      }, 4000)
    }
  }

  // Navigate between images within the same item
  const handleImageNavigation = (direction: "next" | "prev") => {
    const currentItemIndex = carouselItems.findIndex((item) => item.id === activeItem)
    const currentItem = carouselItems[currentItemIndex]

    if (direction === "next" && activeImageIndex < currentItem.images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1)
    } else if (direction === "prev" && activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1)
    }

    // Reset the interval timer when manually changing images
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setActiveItem((current) => {
          const currentIndex = carouselItems.findIndex((item) => item.id === current)
          const currentItem = carouselItems[currentIndex]

          if (currentItem.images.length > 1 && activeImageIndex < currentItem.images.length - 1) {
            setActiveImageIndex(activeImageIndex + 1)
            return current
          } else {
            setActiveImageIndex(0)
            const nextIndex = (currentIndex + 1) % carouselItems.length
            return carouselItems[nextIndex].id
          }
        })
      }, 4000)
    }
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">SEE IT IN ACTION</h2>

        <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-2 bg-zinc-800 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2 space-y-4">
                {carouselItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-md cursor-pointer transition-all ${
                      activeItem === item.id
                        ? "bg-blue-900/20 border border-blue-800/50"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    }`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{item.emoji}</span>
                      <h3 className="font-medium font-heading">{item.title}</h3>
                    </div>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="md:col-span-3 bg-zinc-800 rounded-md p-4 flex items-center justify-center relative">
                <div className="relative w-full h-[550px] flex items-center justify-center">
                  {carouselItems.map((item) => {
                    const currentItem = carouselItems.find((i) => i.id === activeItem)
                    const hasMultipleImages = currentItem && currentItem.images.length > 1

                    return (
                      <div
                        key={item.id}
                        className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                          activeItem === item.id ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        {item.images.map((image, index) => {
                          // Check if this is the receipt image
                          const isReceiptImage = item.id === "vendor-verification" && image.includes("card-plus-2.png")

                          return (
                            <div
                              key={`${item.id}-image-${index}`}
                              className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                                activeItem === item.id && activeImageIndex === index
                                  ? "opacity-100"
                                  : "opacity-0 pointer-events-none"
                              }`}
                            >
                              {isReceiptImage ? (
                                // Custom rendering for receipt image with mask
                                <div
                                  style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "relative",
                                      borderRadius: "24px",
                                      overflow: "hidden",
                                      width: "auto",
                                      height: "auto",
                                      maxHeight: "550px",
                                      display: "inline-block",
                                    }}
                                  >
                                    <img
                                      src={image || "/placeholder.svg"}
                                      alt={`${item.title} - Image ${index + 1}`}
                                      style={{
                                        maxHeight: "550px",
                                        width: "auto",
                                        objectFit: "contain",
                                        display: "block",
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                // Regular image rendering
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`${item.title} - Image ${index + 1}`}
                                  width={600}
                                  height={550}
                                  className="max-w-full max-h-[550px] rounded-lg object-contain"
                                  priority={index === 0}
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>

                {/* Navigation arrows */}
                {carouselItems.find((item) => item.id === activeItem)?.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageNavigation("prev")}
                      className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/80 hover:text-white hover:bg-black/70 transition-all ${activeImageIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100"}`}
                      disabled={activeImageIndex === 0}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => handleImageNavigation("next")}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/80 hover:text-white hover:bg-black/70 transition-all ${activeImageIndex === carouselItems.find((item) => item.id === activeItem)!.images.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100"}`}
                      disabled={
                        activeImageIndex === carouselItems.find((item) => item.id === activeItem)!.images.length - 1
                      }
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image indicators */}
                {carouselItems.find((item) => item.id === activeItem)?.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {carouselItems
                      .find((item) => item.id === activeItem)
                      ?.images.map((_, index) => (
                        <button
                          key={`indicator-${index}`}
                          className={`w-2 h-2 rounded-full transition-all ${activeImageIndex === index ? "bg-blue-500 w-4" : "bg-white/50"}`}
                          onClick={() => setActiveImageIndex(index)}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
