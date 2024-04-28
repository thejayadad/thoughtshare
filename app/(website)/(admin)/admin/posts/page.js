import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'

const AdminPosts = () => {
  return (
    <div className='p-6'>
      <Link href='/admin/create'>
        <Button
        variant='bordered'
        startContent={<FiMessageSquare/>}
        color='primary'
        >
          New Post
        </Button>
      </Link>
    </div>
  )
}

export default AdminPosts