import {
    useQuery, 
    useMutation, 
    useQueryClient, 
    useInfiniteQuery} from '@tanstack/react-query';

import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getUserById, getUsers, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost, updateUser } from "@/lib/appwrite/api";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types';
import { QUERY_KEYS } from './queryKeys';
// useQuery are for fetching data
// use mutations for modifying data
// to simplify data fetching and mutation

// export first mutation
// mutation mutates a function, in this case the useCreateUserAccountMutation, mutates the createUserAccount

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

// signin into account
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {email: string, password: string}) => signInAccount(user)
    })
}

// import signOutAccount as a self calling function

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreatePost = () => {
    // since we  wanna  query existing post and show them online 

    const queryClient = useQueryClient();



    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            // after we create a new post we invalidate the query fro the recent post
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })

        }
})
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    })

}


export const useLikePost = () => {
    // since we  wanna  query existing post and show them online 
    // EVERY POST WE FETCH  using react query the useGetRecentPosts IS CACHED which implies that on subsequent reload when page refreshes it will be faster to fetch
    // implementing functionality so that when a post is LIKED on reload we will not return the cached old value but UPDATE the like 
        // =. that invalidtae current values

        // TO COUNT LIKES

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId,likesArray}: {postId: string; likesArray: string[]}) => likePost(postId,likesArray),
        onSuccess: (data) => {
            // update the Post itself
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]})
            // update other related
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_RECENT_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_CURRENT_USER]})
            
        },
    } )

}

export const useSavePost = () => {
 

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId, userId}: {postId: string; userId: string}) => savePost(postId,userId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_RECENT_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_CURRENT_USER]})
            
        },
    } )

}

export const useDeleteSavedPost = () => {
 

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_RECENT_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_POSTS]})
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_CURRENT_USER]})
            
        },
    } )

}


export const useGetCurrentUser = () => {
    return useQuery({
       queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       queryFn: getCurrentUser 
    })
}

export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID,postId],
        queryFn:() => getPostById(postId), 
        // enabled data fetch only when fetching data for another ID
        enabled:  !!postId
    })
}
// cosume the updatePost api

export const useUpdatePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(post: IUpdatePost) => updatePost(post), 
        // on success get the data and invalidate the query
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })

        }
    })
}

export const useDeletePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({postId, imageId}: {postId:string,imageId:string}) => deletePost(postId, imageId), 
        // on success get the data and invalidate the query
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })

        }
    })
}

export const useGetPosts = () => {
 return useInfiniteQuery({
   queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   queryFn: getInfinitePosts as any,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   getNextPageParam: (lastPage: any) => {
     if (lastPage && lastPage.documents.length === 0) {
       return null;
     }
     const lastId = (lastPage.documents[lastPage.documents.length - 1].$id);
     return lastId;
   },
   initialPageParam: null,
 });
}

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    // add searchTerm to avoid caching of old search
    queryKey: [QUERY_KEYS.SEARCH_POSTS,searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};

// export const useGetUsers = () => {
//   return useInfiniteQuery({
//     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
//     queryFn: getInfiniteUsers,
//     getNextPageParam: (lastPage) => {
// 			// If there's no data, there are no more pages.
// 			if(!lastPage) {return}

// 			// Use the $id of the last document as the cursor.
//             const lastId = (lastPage.documents[lastPage.documents.length - 1].$id);

//             // returning the id of the last document to use as cursor
//             return lastId;

//     },
//     initialPageParam: null,
//   });
// };


// export const useGetUsers = (limit?: number) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USERS],
//     queryFn: () => getUsers(limit),
//   });
// };

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
		queryFn: () => getUsers(limit),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};


export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};