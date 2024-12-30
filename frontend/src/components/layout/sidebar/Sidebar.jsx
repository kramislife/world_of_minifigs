import { useState } from 'react'
import MobileSidebar from './components/MobileSidebar'
import DesktopSidebar from './components/DesktopSidebar'

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar 
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
      />
    </>
  )
}

export default Sidebar