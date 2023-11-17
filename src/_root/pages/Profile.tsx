import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const Profile = () => {
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "PAGE UNDER DEVELOPMENT.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            duration: 30000,
          });
        }}
      >
        Click Me
      </Button>
    </div>
  );
}

export default Profile
