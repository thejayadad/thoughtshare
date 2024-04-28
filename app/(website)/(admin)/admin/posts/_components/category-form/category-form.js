'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit2 } from 'react-icons/fi';
import { getCategories } from '@/lib/actions/post/get-categories';
import { updateCategory } from '@/lib/actions/post/update-category';


// Validation schema using Yup
const schema = Yup.object().shape({
    categoryId: Yup.string().required('Category is required'),
  });

  
  const CategoryForm = ({initialData, postId}) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          categoryId: initialData.categoryId,
        },
      });
      const [loading, setLoading] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [categories, setCategories] = useState([]);
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
          } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Error fetching categories', {
              position: 'top-right',
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        };
    
        fetchCategories();
      }, []);
      const toggleEdit = () => setIsEditing((current) => !current);
   
      const onSubmit = async (data) => {
        try {
          setLoading(true);
    
          await updateCategory({ categoryId: data.categoryId, postId });
    
          toast.success('post category updated successfully!', {
            position: 'top-right',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          window.location.reload();
        } catch (error) {
          console.error('Error updating post category:', error);
          toast.error('Error updating post category', {
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
         Post Category
        <Button onClick={toggleEdit} variant='light'>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FiEdit2 className='h-4 w-4 mr-2' /> Edit Category
            </>
          )}
        </Button>
        </div>
        {!isEditing && (
        <p>{initialData.categoryName}</p>
      )}
      {isEditing && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2">
              <select
                {...register('categoryId')}
                className="block w-full p-2 border rounded-md"
                onChange={(e) => setValue('categoryId', e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500">{errors.categoryId.message}</p>
              )}
            </div>
            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? 'Loading...' : 'Update'}
            </Button>
          </form>
        </>
      )}
      <ToastContainer />
      </div>
    )
  }
  
  export default CategoryForm