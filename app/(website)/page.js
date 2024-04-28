import PostList from '@/components/post/post-list'
import prisma from '@/lib/prisma'
import React from 'react'

const HomePage = async () => {
  const posts = await prisma.post.findMany({})
  return (
    <div className='p-6 space-y-4'>
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div>
        Info
      </div>
      <div>
        Info
      </div>
      </div>
      <PostList items={posts} />
    </div>
  )
}

export default HomePage