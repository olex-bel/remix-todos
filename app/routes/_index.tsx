import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import type { LegacyRef } from "react";
import { json } from "@remix-run/node";
import { getDatabaseInstance } from "~/utils/db.server";

type ToDoItem = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Remix ToDo List" },
    { name: "description", content: "Manage you todo items." },
  ];
};

export const loader = async () => {
  const db = await getDatabaseInstance();
  const todos = await db.all("SELECT * FROM todos") as ToDoItem[];

  return json({
    todos,
  });
};

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const db = await getDatabaseInstance();
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (request.method === "POST") {
    await db.run("INSERT INTO todos(title, description, completed) VALUES (:title, :description, 0)", {
      ":title": data.title,
      ":description": data.description,
    });
  } else if (request.method === "DELETE") {
    await db.run("DELETE FROM todos WHERE id=:id", {
      ":id": data.id,
    });
  }

  return null;
};

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();
  const transition = useNavigation();
  const isAdding = transition.state == "submitting" && transition.formData?.get("_action") === "create";
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [isAdding])

  return (
    <div className="font-sans p-4">
      <Form ref={formRef} method="post" action="/?index">
        <fieldset className="max-w-screen-sm flex flex-col gap-1">
            <label htmlFor="todo-title">Title</label>
            <input ref={inputRef} className="border border-current" required id="todo-title" name="title" type="text"  />
            <label htmlFor="todo-title">Title</label>
            <textarea className="border border-current" required id="todo-description" name="description"  />
            <button 
              className="border border-current px-5 py-1"
              name="_action"
              value="create"
            >
              Add
            </button>
        </fieldset>
      </Form>

      <div>
        {
          todos.map((todo) => 
            (
              <div key={todo.id} className="flex gap-2">
                <div>{todo.title}</div>
                <div>{todo.description}</div>
                <Form method="delete" action="/?index">
                  <input type="hidden" name="id" value={todo.id} />
                  <button 
                    className="border border-current px-5 py-1"
                    name="_action"
                    value="remove"
                  >
                    Remove
                  </button>
                </Form>
              </div>
            )
          )
        }
      </div>
    </div>
  );
}
