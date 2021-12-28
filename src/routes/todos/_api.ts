import type { Request } from '@sveltejs/kit';

let todos: Todo[] = []

export const api = (request: Request, data?: Record<string, unknown>) => {
  let body = {}
  let status = 500

  switch (request.method.toUpperCase()) {
    case "GET":
      body = todos
      status = 200
      break;
    case "POST":
      todos.push(data as Todo)
      body = data
      break;
    case "DELETE":
      todos = todos.filter(todo => todo.uid !== request.params.uid)
      status = 200
      break;
    case "PATCH":
      todos = todos.map(todo => {
        if (todo.uid === request.params.uid) {
          todo.text = data.text as string
        }
        return todo
      })
      status = 200
      break;
  
    default:
      break;
  }

  if (request.method !== "GET") {
    return {
      status: 303,
      headers: {
        location: "/"
      }
    }
  }

  return {
    status,
    body
  }
}