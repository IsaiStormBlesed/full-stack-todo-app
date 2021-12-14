<script>
    import TodoItem from "$lib/todo-item.svelte";

    const title = "Todos App"
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
    
    <form action="" method="" class="new">
        <input type="text" name="text" aria-label="Add a todo" placeholder="+ type to add a todo">
    </form>
    
    <TodoItem />
    <TodoItem />
    <TodoItem />
</div>


