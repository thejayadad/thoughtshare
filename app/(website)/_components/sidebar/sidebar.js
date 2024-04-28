import Logo from '@/components/logo'
import React from 'react'
import SidebarLinks from './sidebar-links'

const Sidebar = () => {
  return (
  <aside
  className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'
  >
    <div className='p-6'>
        <Logo  />
    </div>
    <div className='flex flex-col w-full'>
        <SidebarLinks />
    </div>
  </aside>
  )
}

export default Sidebar