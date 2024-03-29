// form imports are from shadcn 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";



        // a NEW FORM SCHEMA IS DEFINED IN THE Validations folder Post Validation
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });


// Models is coming from appwrite
type PostFormProps = {
    post?: Models.Document;
    action: 'Create' | 'Update';
}


const PostForm = ({ post, action }: PostFormProps) => {

    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();

    const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();


    const { user } = useUserContext();

    const { toast } = useToast();

    const navigate = useNavigate()

    // console.log(post)

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    // Do something with the form values.

    // define code for Update
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        toast({ title: "Please try again" });
      }

      // after UPDATE redirect to Post Details Page
      return navigate(`/posts/${post.$id}`);
    }


    // DEFINE CODE TO CREATE if not update
    const newPost =  await createPost({
        ...values, userId: user.id,
        // ADD LOGIC TO UPDATE POST
    })

    if (!newPost) {
        toast({title: "please try again"})
    }

    // upon success navigate to home
    navigate('/');

  }
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full max-w-5xl"
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Caption</FormLabel>
                <FormControl>
                  {/* <Input placeholder="shadcn" {...field} /> */}
                  <Textarea
                    className="shad-textarea custom-scrollbar"
                    placeholder="Write a post for Valentine"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Add Photos</FormLabel>
                <FormControl>
                  {/* <Input placeholder="shadcn" {...field} /> */}
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Add Location</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Enter your location"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Add Tags (separated by comma ",")
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Art, Expression, Learn, Fun, Holiday"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-center justify-end">
            <Button type="button" className="shad-button_dark_4">
              Cancel
            </Button>
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
              disabled={isLoadingCreate || isLoadingUpdate}
            >
              {isLoadingCreate || isLoadingUpdate && 'Loading..'} 
              {action} Post
            </Button>
          </div>
        </form>
      </Form>
    );
};

export default PostForm;
