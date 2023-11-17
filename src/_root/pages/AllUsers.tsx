
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function AllUsers() {
  const { toast } = useToast();
  

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "PAGE UNDER DEVELOPMENT.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          duration: 30000
        });
      }}
    >
      Click Me
    </Button>
  );
}

export default AllUsers;
