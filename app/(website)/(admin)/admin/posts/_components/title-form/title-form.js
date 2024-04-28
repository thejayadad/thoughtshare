'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit2 } from 'react-icons/fi';
import { updateTitle } from '@/lib/actions/post/update-title';

// Validation schema using Yup
const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  
const TitleForm = ({initialData, postId}) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          title: initialData.title,
        },
      });
      const [loading, setLoading] = useState(false);
      const [isEditing, setIsEditing]  = useState(false)
      const toggleEdit = () => setIsEditing((current) => !current)
      
      const onSubmit = async (data) => {
        try {
          setLoading(true);
    
          // Call the updatedTitle function to update the post title
          await updateTitle({ title: data.title, postId });
    
          toast.success('Post title updated successfully!', {
            position: 'top-right',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    
          // Reload the page once the title is updated successfully
          window.location.reload();
          
        } catch (error) {
          console.error('Error updating Post title:', error);
          toast.error('Error updating Post title', {
            position: 'top-right',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } finally {
          setLoading(false);
        }
    };
    

  return (
    <div className='mt-6 border rounded-md p-4'>
    <div className='font-medium flex items-center justify-between'>
            Post Title
        <Button
        onClick={toggleEdit}
        variant='light'
        >
           {isEditing && (
            <>Cancel</>
           )}
           {!isEditing && (
            <>
             <FiEdit2 className='h-4 w-4 mr-1 text-yellow-900' /> Edit Title
            </>
           )}
        </Button>
        </div>
        {
            !isEditing && (
            <p>{initialData.title}</p>
        )
        }
        {isEditing && (
            <>
           <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter post title..."
              error={errors.title?.message}
            />
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </form>
            
            </>
        )}
       <ToastContainer />
    </div>
  )
}

export default TitleForm