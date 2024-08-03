
import { json } from "@remix-run/node";
import { toggleTodoItemComplete } from "~/utils/todo.operations.server";
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({
    request,
    params,
  }: ActionFunctionArgs) => {
    if (!params.id) {
        throw new Response("Missing Id param", {
            status: 500,
        });
    }

    if (request.method === "POST") {      
        const formData = await request.formData();
        const completed = formData.get("completed") === "on";
        const isSuccess = await toggleTodoItemComplete(params.id, completed)

        if (isSuccess) {
            return json({ error: false, message: "Todo item completed status is updated." });
        } else {
            return json({ error: true, message: "Failed to update todo item's completed status. Please try again later." });
        }
    }
  
    return json({ error: true, message: "Invalid request method." });
};
