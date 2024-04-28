'use client'
import React from 'react'
import Link from "next/link";
import PreviewEditor from '@/app/(website)/(admin)/admin/posts/_components/description-form/preview-editor';
import Premium from './post-cost';
import PostComment from './post-comment';
import PostLink from './post-like';

const PostCard = ({id, title, imageUrl, description, category,tags, premium, user, createdAt, comment, like }) => {
  return (
    <Link href={`/posts/${id}`}>
      <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full'>
      <div className='relative w-full aspect-video rounded-md overflow-hidden'>
        <img
            src={imageUrl}
            alt={title}
            className='object-cover'
        />            
        </div>
        <div className='flex flex-col pt-2'>
        <span
        // href={`/category/${category}`}
        className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
            {category}Category
            </span>
          <div className='text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2'>
                {title}
            </div>
            <div className='flex justify-between items-center space-x-2'>
                <div>
                    <Premium premium={premium}/>
                </div>
                <div className='flex items-center space-x-2 '>
                    <PostComment
                    className="mr=2"
                    comment={comment} />  

                    <PostLink
                    like={like}
                    />
                </div>
            </div>
           </div>
    </div>
    </Link>
  )
}

export default PostCard