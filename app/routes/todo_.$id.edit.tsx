
import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { getTodoItem, updateTodoItem } from "~/utils/todo.operations.server";
import EditTodoForm from "~/components/EditTodoForm";
import type { LoaderFunctionArgs, ActionFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
      { title: "Edit ToDo List Item" },
      { name: "description", content: "Manage you todo items." },
    ];
};

export const loader = async ({
    params,
  }: LoaderFunctionArgs) => {

    if (!params.id) {
        throw new Response("Missing Id param", {
            status: 500,
        });
    }

    const todo = await getTodoItem(params.id);

    if (!todo) {
        throw new Response("Not found", {
            status: 404,
        });
    }
  
    return json({
        todo,
    });
};

export const action = async ({
    request,
    params,
  }: ActionFunctionArgs) => {
    if (!params.id) {
        throw new Response("Missing Id param", {
            status: 500,
        });
    }

    const formData = await request.formData();

    if (request.method === "PUT") {   
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        if (!title) {
            return json({ error: true, message: "Title are required." });
        }

        if (!description) {
            return json({ error: true, message: "Description are required." });
        }

        const isSuccess = await updateTodoItem(params.id, title, description);

        if (isSuccess) {
            return redirect("/");
        }

        return json({ error: true, message: "Failed to update todo item. Please try again later." });
    }

    return json({ error: true, message: "Invalid request method." });
}

export default function EditTodo() {
    const { todo } = useLoaderData<typeof loader>();

    return (
        <div>
            <EditTodoForm item={todo} />
        </div>
    );
}
