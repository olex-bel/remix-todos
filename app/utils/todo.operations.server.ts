import { getDatabaseInstance } from "~/utils/db.server";

export type ToDo = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};

export async function getTodoItems() {
    try {
        const db = await getDatabaseInstance();
        const todos = await db.all("SELECT * FROM todos") as ToDo[];

        return todos;
    } catch (e) {
        return [];
    }
}

export async function getTodoItem(id: string) {
    try {
        const db = await getDatabaseInstance();
        const todo = await db.get("SELECT * FROM todos WHERE id=:id", {
            ":id": id,
        });

        if (!todo) {
            return null;
        }

        return todo as ToDo;
    }catch (e) {
        return null;
    }
}

export async function addTodo(title: string, description: string) {
    try {
        const db = await getDatabaseInstance();        
        await db.run("INSERT INTO todos(title, description, completed) VALUES (:title, :description, 0)", {
          ":title": title,
          ":description": description,
        });

        return true;
    } catch (e) {
        return false;
    }
}

export async function deleteTodo(id: string) {
    try {
        const db = await getDatabaseInstance();        
        await db.run("DELETE FROM todos WHERE id=:id", {
            ":id": id,
        });

        return true;
    } catch(e) {
        return false;
    }
}

export async function updateTodoItem(id: string, title: string, description: string) {
    try {
        const db = await getDatabaseInstance();        
        await db.run("UPDATE todos SET title=:title, description=:description, completed=0  WHERE id=:id", {
          ":id": id,
          ":title": title,
          ":description": description,
        });

        return true;
    } catch (e) {
        return false;
    }
}

export async function toggleTodoItemComplete(id: string, completed: boolean) {
    try {
        const db = await getDatabaseInstance();        
        await db.run("UPDATE todos SET completed=:completed  WHERE id=:id", {
          ":id": id,
          ":completed": completed? 1 : 0,
        });

        return true;
    } catch (e) {
        return false;
    }
}
