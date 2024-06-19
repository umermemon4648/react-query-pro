"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useCreatePost } from "@/lib/react-query/postQueries";

interface ModalProps {
  children: React.ReactNode;
}
const formSchema = z.object({
  caption: z.string().min(2, {
    message: "Caption must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
});

export function PostModal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
      location: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  // QUERY
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // e.preventDefault();
    const newPost = await createPost(values);
    console.log("NEw POST", newPost);

    if (newPost) {
      console.log("NEw POST1", newPost);
      form.reset();
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                    Caption
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-0 bg-zinc-300/50 focus-visible:ring-zinc-400 focus-visible:ring-offset-1
                      "
                      disabled={isLoading}
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-zinc-500 font-bold text-xs">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-0 bg-zinc-300/50 focus-visible:ring-zinc-400 focus-visible:ring-offset-1
                      "
                      disabled={isLoading}
                      placeholder="Enter location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                disabled={isLoadingCreate}
                variant="primary"
                type="submit"
              >
                {isLoadingCreate ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
