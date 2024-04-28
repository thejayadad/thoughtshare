import React from 'react'
import PostCard from './post-card'


// title, description, category,tags, premium, user, createdAt

const PostList = ({items}) => {
  return (
    <div>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
        {
            items.map((item) => (
                <PostCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    tags={item.tags}
                    premium={item.premium}
                    imageUrl={item.imageUrl}
                    user={item.user}
                    createdAt={item.createdAt}
                />
            ))
        }            
      </div>

    </div>
  )
}

export default PostList