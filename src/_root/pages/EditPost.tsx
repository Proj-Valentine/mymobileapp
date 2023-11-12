
import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";



const EditPost = () => {
  // bring back the OLD POST so we create an API function in our appwrite to fetch post from appwritea

  const { id } = useParams();

  const { data: post, isPending } = useGetPostById(id || "")
  // /post forms

  if (isPending) return <Loader/>

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add post"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm action="Update" post = {post} />
      </div>
    </div>
  );
};

export default EditPost;
