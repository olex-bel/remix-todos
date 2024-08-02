
import { useFetcher  } from "@remix-run/react"
import type { ToDo } from "~/utils/todo.operations.server";

type ToDoItemProps = {
    item: ToDo;
}

export default function ToDoItem({ item }: ToDoItemProps) {
    const fetcher = useFetcher();

    return (
        <div key={item.id} className="flex gap-2">
            <div>{item.title}</div>
            <div>{item.description}</div>
            <fetcher.Form method="delete" action={`todo/${item.id}`}>
                <button 
                    className="border border-current px-5 py-1"
                    name="_action"
                    value="remove"
                >
                    Remove
                </button>
            </fetcher.Form>
        </div>
    )
}