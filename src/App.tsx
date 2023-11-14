import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
};

let id = 0;

export default function App() {
  const [input, setInput] = useState("");

  const [todos] = useState<Todo[]>([]);

  const { mutate, variables, isPending } = useMutation({
    mutationFn: async (todo: Todo) => {
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      todos.push(todo);
      setInput("");
    },
    onError: () => {
      toast.error("DB Store failed");
    },
  });

  const { data } = useQuery({
    queryKey: ["todo"],
    queryFn: () => todos,
  });

  return (
    <>
      <Toaster />
      <form
        className="max-w-7xl mx-auto my-[10%] flex"
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ id: (id = id + 1), title: input });
        }}
      >
        <input
          placeholder="Write a todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <div className="max-w-7xl mx-auto">
        {data?.map((t) => (
          <p key={t.id}>
            {t.id}-{t.title}
          </p>
        ))}
        {isPending && (
          <p className="opacity-50">
            {variables.id} -{variables.title}
          </p>
        )}
      </div>
    </>
  );
}
