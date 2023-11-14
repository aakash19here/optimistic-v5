import { useState } from "react";
import { Toaster } from "react-hot-toast";

type Todo = {
  id: number;
  title: string;
};

let id = 0;

export default function App() {
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await new Promise((resolve, reject) => setTimeout(resolve, 200));
    id = id + 1;
    setTodos((prevTodo) => [
      ...prevTodo,
      {
        id: id,
        title: input,
        isCompleted: false,
      },
    ]);
    setInput("");
  };

  return (
    <>
      <Toaster />
      <form className="max-w-7xl mx-auto my-[10%] flex" onSubmit={handleSubmit}>
        <input
          placeholder="Write a todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <div className="max-w-7xl mx-auto">
        {todos?.map((t) => (
          <p key={t.id}>
            {t.id}-{t.title}
          </p>
        ))}
      </div>
    </>
  );
}
