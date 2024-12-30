import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { pathname } = useLocation()

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Handle scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  // Handle route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [pathname])

  return (
    <>
      {isVisible && 
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2 z-[9999] bg-red-600 hover:bg-red-700 text-light"
          size="icon"
          onClick={scrollToTop}
        >
          <ArrowUpIcon className="h-4 w-4" />
        </Button>
      }
    </>
  )
}

export default ScrollToTop