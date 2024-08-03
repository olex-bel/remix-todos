
import { Form, useNavigation, useActionData } from "@remix-run/react"
import { useEffect, useRef } from "react";
import { action } from "~/routes/_index";

export default function AddTodoForm() {
    const transition = useNavigation();
    const isAdding = transition.state == "submitting" && transition.formData?.get("_action") === "create";
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const data = useActionData<typeof action>();

    useEffect(() => {
        if (!isAdding) {
            formRef.current?.reset();
            inputRef.current?.focus();
        }
    }, [isAdding])

    return (
        <Form ref={formRef} method="post" action="/?index" className="w-full rounded bg-slate-200 p-2">
            <fieldset className="max-w-screen-sm flex flex-col gap-1 mx-auto">
                <label htmlFor="todo-title">Title</label>
                <input 
                    ref={inputRef} 
                    id="todo-title"
                    className="border rounded w-full bg-slate-50 px-4 my-2 py-2" 
                    required 
                    name="title" 
                    type="text"
                    placeholder="To do title..."
                />
                <label htmlFor="todo-title">Description</label>
                <textarea 
                    id="todo-description" 
                    className="border rounded w-full bg-slate-50 px-4 my-2 py-2" 
                    required 
                    name="description" 
                    placeholder="To do description..."
                />
                <button 
                    className="border rounded w-full px-5 py-3 my-2 text-slate-50 bg-slate-500 hover:bg-slate-600 disabled:text-slate-400 disabled:bg-slate-100"
                    name="_action"
                    value="create"
                    disabled={isAdding}
                >
                    Add
                </button>

                {data && data.message}
            </fieldset>
        </Form>
    )
}
