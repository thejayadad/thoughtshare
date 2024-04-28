import prisma from '@/lib/prisma';
import React from 'react';

const SinglePostPage = async ({ params }) => {
    const { id } = params;
    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            user: true,
            category: true
        }
    });

    return (
        <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-xl mx-auto p-8 min-h-screen'>
                <div className='p-1 col-span-1 mx-auto'>
                    <img src={post.imageUrl} alt={post.title} className='object-cover rounded-md' />
                </div>
                <div className='p-1 col-span-1'>
                    <div>
                        <div className='flex justify-between p-2'>
                            <h1 className='text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2 cursor-pointer'>{post.title}</h1>
                        </div>
                        <div className='mb-4 flex items-center'>
                            <img src={post.user?.image} alt="User Image" className="h-10 w-10 rounded-full" />
                            <p className="ml-2">{post.user?.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-2">Description:</p>
                            <p>{post.description}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-2">Tags:</p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags && post.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 rounded-full px-2 py-1 text-sm">{tag.name}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-2">Category:</p>
                            <p>{post.category?.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;
