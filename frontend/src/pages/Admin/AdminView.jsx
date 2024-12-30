import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/layout/sidebar/Sidebar'

const AdminView = () => {
  return (
    <div className="min-h-screen flex">
      <div className="sticky top-20 h-screen">
        <Sidebar />
      </div>
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminView
