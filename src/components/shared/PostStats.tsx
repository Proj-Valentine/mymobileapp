import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useState,useEffect } from "react";
import Loader from "./Loader";

// create type for post props
type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

// post? in declaring a variable is to declare it as optional

const PostStats = ({post, userId}: PostStatsProps) => {
  // current likes on a post

  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  // create two use state
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost,isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();

 

  // find current logged in user
  const { data: currentUser } = useGetCurrentUser();

  // need to get the current SAVED state of the post when the page is RELOADED just like for the LIKES

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

    // console.log(savedPostRecord);
    //  console.log(currentUser);

  // pass a call bacck function to
  useEffect(() => {
    // setIsSaved(savedPostRecord? true:false); THIS CODE CAN BE WRITTEN AS BELOW ie auto boolean assignment
    // eg {saved:true} =>!saved =>!false =true
    // !!test
    // 'test' => !test => !false =true
    // empty string : '' => !''=>true =false
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);
  // functions to Like, dislike, save and unsave post

  const handleLikePost = (e: React.MouseEvent) => {
    // stop porpagation helps incase the main CONTAINER is clickable, allows you to click only on the like icon  and not open the outer container with the click
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);

      // return stops the execution of other code blocks
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
    }
  };

  return (
    <div className=" flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          // open a dynamic code block to render blank icon and red icon if post is liked
          //   src="/assets/icons/like.svg"
          // thus if a users ID is part of the liked list, the icon will show RED ie will be filed else it will be empty yet to be clicked
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          //   onClick, get the click event (e) and call the handle click function
          //   onClick={(e) => handleLikePost(e)}
          //   if both the PARAM and the function CALL takes the same PARAM  you can write it this way
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
         {isSavingPost || isDeletingSaved? <Loader/> : <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="save"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />}
        {/* <p className="small-medium lg:base-medium">0</p> */}
      </div>
    </div>
  );
};

export default PostStats;
