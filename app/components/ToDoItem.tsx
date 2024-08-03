
import { useFetcher, Link  } from "@remix-run/react"
import { RiDeleteBin2Line, RiEdit2Line } from "@remixicon/react";
import type { ToDo } from "~/utils/todo.operations.server";
import { ChangeEvent } from "react";

type ToDoItemProps = {
    item: ToDo;
};

export default function TodoItem({ item }: ToDoItemProps) {
    const fetcher = useFetcher();
    const handleCompletionFlagChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        fetcher.submit(event.target.form);
    };

    return (
        <li className="flex gap-2 rounded cursor-pointer px-4 py-2 w-full bg-slate-100 even:bg-slate-200">
            <fetcher.Form method="post" action={`todo/${item.id}/toggle-complete`} className="grow peer">
                <label className="has-[:checked]:line-through has-[:checked]:text-slate-500">
                    <input 
                        type="checkbox" 
                        name="completed" 
                        checked={item.completed? true : false} 
                        className="mr-2" 
                        onChange={handleCompletionFlagChange}
                    />
                    {item.title}
                </label>
            </fetcher.Form>
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