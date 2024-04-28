'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit2 } from 'react-icons/fi';
import { updateDescription } from '@/lib/actions/post/update-description';
import Editor from './editor';
import PreviewEditor from './preview-editor';

// Validation schema using Yup
const schema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
  });

  
  const DescriptionForm = ({initialData, postId}) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          description: initialData.description,
        },
    });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewValue, setPreviewValue] = useState(initialData.description);  // State for preview
    const toggleEdit = () => setIsEditing((current) => !current);
    const onSubmit = async (data) => {
        try {
          setLoading(true);
    
          // Call the updatepostTitle function to update the post title
          await updateDescription({ description: data.description, postId });
    
          setPreviewValue(data.description);

          toast.success('Post description updated successfully!', {
            position: 'top-right',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          window.location.reload();
        } catch (error) {
          console.error('Error updating post description:', error);
          toast.error('Error updating post description', {
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
            Post Description
        <Button
        onClick={toggleEdit}
        variant='light'
        >
           {isEditing && (
            <>Cancel</>
           )}
           {!isEditing && (
            <>
             <FiEdit2 className='h-4 w-4 mr-1 text-yellow-900' /> Edit Description
            </>
           )}
        </Button>
        </div>
        {
        !isEditing && (
            <>
            <PreviewEditor value={previewValue}/>
            </>
        )
    }
             {isEditing && (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Editor
                                    {...field}
                                    placeholder="Enter Post Description..."
                                    error={errors.description?.message}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        setPreviewValue(value);  // Update the preview value
                                    }}
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
  
  export default DescriptionForm