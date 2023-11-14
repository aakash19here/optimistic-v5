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

  const [shouldFail, setShouldFail] = useState(false);

  const { mutate, variables, isPending } = useMutation({
    mutationFn: async (todo: Todo) => {
      await new Promise((resolve, reject) =>
        setTimeout(shouldFail ? reject : resolve, 1000)
      );
      todos.push(todo);
      setInput("");
    },
    onSuccess: () => {
      toast.success("Todo added");
    },
    onError: () => {
      toast.error("Failed to store in DB");
      id = id - 1;
    },
  });

  const { data } = useQuery({
    queryKey: ["todo"],
    queryFn: () => todos,
  });

  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ id: (id = id + 1), title: input });
          }}
          className="space-x-8 flex items-center"
        >
          <input
            placeholder="Write a todo"
            value={input}
            className="p-3 rounded-md w-80"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="bg-white p-3 text-black rounded-md">
            Add Todo
          </button>
          <p className="underline">
            Should fail ?
            <input
              type="checkbox"
              className="mx-2"
              onChange={() => setShouldFail(!shouldFail)}
            />
          </p>
        </form>
        <div className="mt-5">
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
      </div>
    </>
  );
}
