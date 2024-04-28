

import React from 'react'

import {Button, ButtonGroup} from "@nextui-org/react";
import Link from "next/link"
import AuthLinks from '@/components/header/auth-links';
import NavItems from './nav-item';

const NavLinks = () => {

  return (
    <div className='flex gap-x-1 ml-auto items-center'>          
        <NavItems />       
        <AuthLinks />
    </div>
  )
}

export default NavLinks