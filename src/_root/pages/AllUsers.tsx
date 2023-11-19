
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";


const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
  // check what data is coming
  console.log (creators)

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;


// import { Button } from "@/components/ui/button";
// import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";


// export function AllUsers() {
//   // const { toast } = useToast();

//   const { data: users, fetchNextPage, hasNextPage } = useGetUsers();

//   // ref: to refer to the element we want to track.
//   // inView: tells if the element is in view or not.
//   const { ref, inView } = useInView();

//   // if ref is in view, ftech next page
//   useEffect(() => {
//     if (inView) {
//       fetchNextPage();
//     }
//   }, [inView]);
  

//   return (
//     <div ref = {ref}>
//          <Button
//             variant="outline"
//             onClick={() => {}}
//           >
//             Click Me
//         </Button>

//     </div>

//   );
// }

// export default AllUsers;