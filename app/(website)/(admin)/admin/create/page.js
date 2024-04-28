'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/actions/post/create-post';

const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
});
  
const CreatePostPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await createPost(data);
            setLoading(false);
            router.push(`/admin/posts/${response.id}`);
            toast.success('Post created successfully!');
        } catch (error) {
            setLoading(false);
            toast.error('Failed to create post.');
        }
    };

    return (
        <div className='max-w-screen-lg mx-auto flex flex-col justify-center md:items-center md:justify-center h-full p-6'>
            <h1 className='text-2xl'>Name The Post</h1>
            <p className='text-sm text-darkBlue'>Add Your Title Below</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <span>Post Title</span>
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder='Post Title...'
                        />
                    )}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                <p className='text-sm font-light'>Make a good!</p>
                <div className='flex items-center gap-x-2'>
                    <Link href="/">
                        <Button className='bg-orange-300'>Cancel</Button>
                    </Link>
                    <Button
                        className='bg-primary'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Continue'}
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreatePostPage;
