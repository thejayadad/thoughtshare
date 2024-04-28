import Badge from '@/components/badge/badge'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { FiMessageSquare, FiList } from 'react-icons/fi'
import TitleForm from '../_components/title-form/title-form'
import DescriptionForm from '../_components/description-form/description-form'
import ImageUrlForm from '../_components/image-form/imageUrl-form'
import CategoryForm from '../_components/category-form/category-form'



const PostDetailPage = async ({params}) => {
    const post = await prisma.post.findUnique({
        where: {
            id: params.id
        }
    })
    if(!post){
        return redirect("/")

    }

    //required fields to publish
    const requiredFields = [
        post.title,
        post.description,
        post.imageUrl,
        post.categoryId,
        post.tags,
        post.premium,        
    ]
    //Total fields needed to publish the post 
    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    //Display the required fields onscreen
    const completedNumber = `(${completedFields} / ${totalFields})`
    
  return (
    <div className='p-6'>
       <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-medium'>Lets Finish Your Post</h1>
                <span className='text-gray-800'>Fill in the required fields {completedNumber}</span>
            </div>
       </div>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
            <div>
                <div className='flex items-center gap-x-2'>
                    <Badge
                    icon={FiMessageSquare}
                    variant='default'
                    />
                    <h2 className='text-xl'>Update Your Post</h2>
                </div>
                <TitleForm
                initialData={post}
                postId={post.id}
                />
                <DescriptionForm
                initialData={post}
                postId={post.id}
                />
                <ImageUrlForm
                    initialData={post}
                    postId={post.id}
                />
        
            </div>
            <div className='space-y-6'>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <Badge
                        icon={FiList}
                        variant='default'
                        />
                        <h2 className='text-xl'>Post Categories</h2>
                    </div>
                    <div>
                    <CategoryForm
                    initialData={post}
                    postId={post.id}
                    />
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default PostDetailPage