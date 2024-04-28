import React from 'react'
import MobileSidebar from './mobile-navbar'
import NavLinks from './navbar-links'

const Navbar = () => {
  return (
    <div
    className='p-4 border-b border-primary/30 h-full flex items-center bg-white shadow-sm'
    >
        <MobileSidebar />
        <NavLinks />

    </div>
  )
}

export default Navbar