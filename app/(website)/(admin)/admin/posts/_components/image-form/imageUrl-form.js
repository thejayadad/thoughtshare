'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit2, FiEdits, FiTrash2 } from 'react-icons/fi'; // Added FiTrash2 for delete icon
import { updateImage } from '@/lib/actions/post/update-imageUrl';
import ImageUpload from './image-upload';


// Validation schema using Yup
const schema = Yup.object().shape({
    imageUrl: Yup.string().required('Image is required'),
  });


const ImageUrlForm = ({ initialData, postId }) => {
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          imageUrl: initialData.imageUrl,
        },
      });
      const [loading, setLoading] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const imageUrl = watch('imageUrl'); // Get imageUrl from form values
    
      const toggleEdit = () => setIsEditing((current) => !current);
      
        const handleUpload = (url) => {
          setValue('imageUrl', url); // Set the uploaded image URL to the form field
        };

        const handleDelete = () => {
          setValue('imageUrl', ''); // Clear the imageUrl field
        };
        const onSubmit = async (data) => {
          try {
            setLoading(true);
            await updateImage({ ...data, postId }); // Pass the postId along with the imageUrl
            toast.success('Image updated successfully!', {
              position: 'top-right',
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            window.location.reload();
          } catch (error) {
            console.error('Error updating image:', error);
            toast.error('Error updating image', {
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
      Post Image
        <Button
        onClick={toggleEdit}
        variant='light'
        >
           {isEditing && (
            <>Cancel</>
           )}
           {!isEditing && (
            <>
             <FiEdit2 className='h-4 w-4 mr-1 text-yellow-900' /> Edit Image
            </>
           )}
        </Button>
      </div>
      {isEditing && (
        <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='imageUrl'
            control={control}
            render={({ field }) => (
              <div className='flex items-center'>
                <Input
                  {...field}
                  placeholder='Image URL...'
                  error={errors.imageUrl?.message}
                />
                {imageUrl && (
                  <Button
                    onClick={handleDelete}
                    className='ml-2'
                    variant='error'
                  >
                    <FiTrash2 />
                  </Button>
                )}
              </div>
            )}
          />
          {imageUrl && (
            <div className='mt-2'>
              <img src={imageUrl} alt='Post Preview' className='w-full h-auto max-h-40 object-cover' />
            </div>
          )}
          <div className='mt-2'>
            <ImageUpload onUpload={handleUpload} />
          </div>
          <Button
            className='bg-primary mt-4'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Update'}
          </Button>
        </form>
      )}
      <ToastContainer />
    </div>
  )
}

export default ImageUrlForm