import type { RequestHandler } from "@sveltejs/kit";

let todo: Todo[] = []

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todo
    }
}

export const post: RequestHandler<{}, FormData> = (request) => {
    todo.push({
        created_at: new Date(),
        text: request.body.get("text"),
        done: false
    })
    
    return {
        status: 303,
        headers: {
            location: "/"
        }
    }
}