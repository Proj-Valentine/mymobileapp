import React from 'react'
import Loader from '@/components/shared/Loader'
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations'
import { Models } from 'appwrite'
import PostCard from '@/components/shared/PostCard'

const Home = () => {
  // with every query you get data object
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts()


  // const isPostLoading = true
  // const posts = null
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            Home Feed
          </h2>
         {isPostLoading && !posts ? (<Loader/>):(
          // create a list to fetch all users post
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.documents.map((post: Models.Document) => (
              // testing to see if post is being fetched from database
              // <li>{post.caption}</li>
              <PostCard post={post} key={post.caption}/>
            ))}

          </ul>
         )} 


        </div>

      </div>
      
    </div>
  )
}

export default Home
