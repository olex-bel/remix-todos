import { useLoaderData } from "@remix-run/react";
import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { addTodo, getTodoItems } from "~/utils/todo.operations.server";
import AddTodoForm from "~/components/AddTodoForm";
import TodoItem from "~/components/TodoItem";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix ToDo List" },
    { name: "description", content: "Manage you todo items." },
  ];
};

export const loader = async () => {
  const todos = await getTodoItems();

  return json({
    todos,
  });
};

export const action = async ({
        request,
    }: ActionFunctionArgs) => {
    
    if (request.method === "POST") {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        if (!title) {
            return json({ error: true, message: "Title are required." });
        }

        if (!description) {
            return json({ error: true, message: "Description are required." });
        }

        const isSuccess = await addTodo(title, description);

        if (isSuccess) {
            return json({ error: false, message: "Todo item created successfully." });
        } else {
            return json({ error: true, message: "Failed to create todo item. Please try again later." });
        }
    }

    return json({ error: true, message: "Invalid request method." });
};

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <div>
      <AddTodoForm />
      <ul className="rounded mt-2">
        {
          todos.map((todo) => <TodoItem key={todo.id} item={todo} />)
        }
      </ul>
    </div>
  );
}
