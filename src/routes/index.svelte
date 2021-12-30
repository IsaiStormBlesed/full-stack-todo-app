<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import { enhance } from "$lib/actions/form";

    export const load: Load = async ({ fetch }) => {
        const res = await fetch("/todos.json")

        if (res.ok) {
            const todos = await res.json()
            return {
                props: { todos }
            }
        }

        const { message } = await res.json()
        return {
            error: new Error(message)
        }
    }
</script>

<script lang="ts">
    import TodoItem from "$lib/todo-item.svelte";

    export let todos: Todo[];

    const title = "Todos App"

    const proccessNewTodo = async (res: Response, form: HTMLFormElement) => {
        const newTodo = await res.json()
        todos = [...todos, newTodo]

        form.reset()
    }

    const processUpdateTodo = async (res: Response) => {
        const updatedTodo = await res.json()

        todos = todos.map(todo => {
            if (todo.uid === updatedTodo.uid) return updatedTodo
            return todo
        })
    }
</script>

<style>
    .todos-container {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto 0 auto;
    }

    .new {
        margin-bottom: 0.5rem;
    }

    .new input {
        font-size: 28px;
        width: 100%;
        padding: 0.5em 1em 0.3em 1em;
        text-align: center;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 8px;
        outline: none;
    }

    .todos-container :global(input) {
        border: none;
    }

    .todos-container :global(input:focus-visible) {
        border: 2px solid var(--primary-color) !important;
        outline: none;
        box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
    }
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos-container">
    <h1>{title}</h1>
    
    <form action="/todos.json" method="post" class="new" use:enhance={{
        result: proccessNewTodo
    }}>
        <input type="text" name="text" aria-label="Add a todo" placeholder="+ type to add a todo">
    </form>
    
    {#each todos as todo}
        <TodoItem 
            {todo}
            {processUpdateTodo} 
            processDeleteTodo={() => {
            todos = todos.filter(t => t.uid != todo.uid)
        }}/>
    {/each}
</div>


