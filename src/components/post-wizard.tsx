import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  content: z
    .string()
    .max(300, { message: "Text must contain at most 300 character(s)" }),
});

export default function PostWizard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <form
      className="w-4/5 rounded-lg p-4 bg-gray-800"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="content"
        control={form.control}
        render={({ field }) => (
          <textarea
            placeholder="What's on your mind?"
            className="w-full outline-none resize-none h-[100px] bg-transparent text-gray-200"
            {...field}
          />
        )}
      />
      <div className="h-10">
        {form.formState.errors.content && (
          <p className="text-sm text-red-400">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>
      <div className="w-full flex justify-end items-center">
        <button
          type="submit"
          className="px-5 py-1 rounded-lg bg-green-400 text-white outline-none"
        >
          Post
        </button>
      </div>
    </form>
  );
}
