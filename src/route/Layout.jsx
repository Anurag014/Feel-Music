import App from '@/App'
import React from 'react'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <>
        <App />
        <Outlet />
    </>
  )
}

export default Layout