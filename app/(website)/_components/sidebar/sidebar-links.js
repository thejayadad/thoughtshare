'use client'
import React from 'react'
import {FiActivity, FiBarChart, FiHome, FiList, FiMenu, FiSearch} from "react-icons/fi"
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'


const guestLinks = [

    {
        icon: <FiMenu />,
        label: "Dashboard",
        href: "/dashboard"
    },

    {
        icon: <FiSearch/>,
        label: "Browse",
        href: "/search"
    }
]
const adminLinks = [

    {
        icon: <FiList />,
        label: "Posts",
        href: "/admin/posts"
    },

    {
        icon: <FiActivity/>,
        label: "Activity",
        href: "/admin/activity"
    }
]


const SidebarLinks = () => {
    const pathname = usePathname()
    const isAdminPage = pathname?.includes("/admin")
    const routes = isAdminPage ? adminLinks : guestLinks

  return (
    <div
    className='flex flex-col w-full'
    >
        {routes.map((route) => (
            <SidebarItem
            icon={route.icon}
            key={route.href}
            label={route.label}
            href={route.href}
            />
        ))}
    </div>
  )
}

export default SidebarLinks