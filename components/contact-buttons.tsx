import { Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <Button
        as="a"
        href="tel:+12625018982"
        variant="outline"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex items-center gap-2"
      >
        <Phone className="h-4 w-4" />
        Call Us
      </Button>
      <Button
        as="a"
        href="sms:+12625018982"
        variant="outline"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex items-center gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        Text Us
      </Button>
    </div>
  )
}
