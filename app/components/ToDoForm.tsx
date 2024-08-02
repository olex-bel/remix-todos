
import { Form, useNavigation, useActionData } from "@remix-run/react"
import { useEffect, useRef } from "react";
import { action } from "~/routes/_index";

export default function ToDoForm() {
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
        <Form ref={formRef} method="post" action="/?index">
            <fieldset className="max-w-screen-sm flex flex-col gap-1">
                <label htmlFor="todo-title">Title</label>
                <input ref={inputRef} className="border border-current" required id="todo-title" name="title" type="text"  />
                <label htmlFor="todo-title">Description</label>
                <textarea className="border border-current" required id="todo-description" name="description"  />
                <button 
                    className="border border-current px-5 py-1"
                    name="_action"
                    value="create"
                >
                    Add
                </button>

                {data && data.message}
            </fieldset>
        </Form>
    )
}