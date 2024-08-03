
import { Form, useActionData, useNavigate } from "@remix-run/react"
import { useEffect, useRef } from "react";
import { action } from "~/routes/_index";
import type { ToDo } from "~/utils/todo.operations.server";

type EditTodoFormProps = {
    item: ToDo;
}

export default function EditTodoForm({ item }: EditTodoFormProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const data = useActionData<typeof action>();
    const navigate = useNavigate();
    
    useEffect(() => {   
        inputRef.current?.focus();        
    }, [])

    return (
        <Form method="put" action={`/todo/${item.id}/edit`} className="w-full rounded bg-slate-200 p-2">
            <fieldset className="max-w-screen-sm flex flex-col gap-1 mx-auto">
                <label htmlFor="todo-title">Title</label>
                <input 
                    ref={inputRef} 
                    id="todo-title" 
                    className="border rounded w-full bg-slate-50 px-4 my-2 py-2" 
                    required 
                    name="title" 
                    type="text" 
                    defaultValue={item.title} 
                />
                <label htmlFor="todo-title">Description</label>
                <textarea 
                    id="todo-description" 
                    className="border rounded w-full bg-slate-50 px-4 my-2 py-2" 
                    required 
                    name="description" 
                    defaultValue={item.description} 
                />
                <div className="flex gap-2">
                    <button 
                        className="border rounded w-full px-5 py-3 my-2 text-slate-50 bg-slate-500 hover:bg-slate-600 disabled:text-slate-400 disabled:bg-slate-100"
                        name="_action"
                        value="update"
                    >
                        Update
                    </button>

                    <button 
                        className="border rounded w-full px-5 py-3 my-2 text-slate-50 bg-slate-500 hover:bg-slate-600 disabled:text-slate-400 disabled:bg-slate-100"
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </div>

                {data && data.message}
            </fieldset>
        </Form>
    )
}
