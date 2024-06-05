import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  content: z.string().min(1).max(300),
});

export default function CommentWizard({ postId }: { postId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <form
      className="w-4/5 bg-gray-800 px-5 py-2 flex justify-between items-center rounded-lg"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className="w-full outline-none bg-transparent text-white"
        placeholder="Comment"
      />
    </form>
  );
}
