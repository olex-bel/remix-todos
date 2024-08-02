
import { json } from "@remix-run/node";
import { deleteTodo } from "~/utils/todo.operations.server";

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

    if (request.method === "DELETE") {      
        const isSuccess = await deleteTodo(params.id);

        if (isSuccess) {
            return json({ error: false, message: "Todo item deleted successfully." });
        } else {
            return json({ error: true, message: "Failed to delete todo item. Please try again later." });
        }
    }
  
    return json({ error: true, message: "Invalid request method." });
};