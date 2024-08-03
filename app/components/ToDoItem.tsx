
import { useFetcher, Link  } from "@remix-run/react"
import { RiDeleteBin2Line, RiEdit2Line } from "@remixicon/react";
import TodoItemTitle from "./TodoItemTitle";
import type { ToDo } from "~/utils/todo.operations.server";

type ToDoItemProps = {
    item: ToDo;
};

export default function TodoItem({ item }: ToDoItemProps) {
    const fetcher = useFetcher();

    return (
        <li className="flex gap-2 rounded cursor-pointer px-4 py-2 w-full bg-slate-100 even:bg-slate-200">
            <TodoItemTitle id={item.id} title={item.title} completed={item.completed} />
            <fetcher.Form method="post" action={`todo/${item.id}/delete`}>
                <button 
                    name="_action"
                    value="remove"
                >
                    <RiDeleteBin2Line />
                    <span className="sr-only">Remove</span>
                </button>
            </fetcher.Form>
            <Link to={`/todo/${item.id}/edit`}>
                <RiEdit2Line />
                <span className="sr-only">Edit</span>
            </Link>
        </li>
    )
}