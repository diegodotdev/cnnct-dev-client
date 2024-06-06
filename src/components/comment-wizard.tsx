import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment } from "../lib/actions";
import { useUser } from "@clerk/clerk-react";

const formSchema = z.object({
  content: z.string().min(1).max(300),
});

export default function CommentWizard({ postId }: { postId: string }) {
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const body = {
      postId: postId,
      userId: user?.id as string,
      userName: user?.firstName as string,
      userAvatar: user?.imageUrl as string,
      content: values.content,
    };
    await createComment(body);
  };
  return (
    <form
      className="w-4/5 bg-gray-800 px-5 py-2 flex justify-between items-center rounded-lg"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="content"
        control={form.control}
        render={({ field }) => (
          <input
            type="text"
            className="w-full outline-none bg-transparent text-white"
            placeholder="Comment"
            {...field}
          />
        )}
      />
    </form>
  );
}
