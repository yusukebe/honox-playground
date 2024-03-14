import { hc } from 'hono/client'
import { useState } from 'hono/jsx'
import type { PropsWithChildren } from 'hono/jsx'
import type { AppType } from '../routes'
import type { Todo } from '../types'

export default function Todo({ initialTodos }: PropsWithChildren<{ initialTodos: Todo[] }>) {
  const [todos, setTodos] = useState(initialTodos)

  const client = hc<AppType>('/')

  const createTodo = async (title: string) => {
    const res = await client.index.$post({
      json: {
        title: title
      }
    })
    const data = await res.json()
    setTodos([...todos, data])
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (e.target instanceof HTMLFormElement) {
      const form = new FormData(e.target)
      const title = form.get('title')
      if (title) {
        createTodo(title.toString())
        e.target.reset()
      }
    }
  }

  const deleteTodo = async (id: string) => {
    const res = await client.index.$delete({
      json: {
        id: id
      }
    })
    const data = await res.json()
    setTodos(todos.filter((todo) => todo.id !== data.id))
  }

  return (
    <div>
      <form class="mb-4" onSubmit={handleSubmit}>
        <div class="mb-2">
          <input
            name="title"
            type="text"
            autocomplete="off"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
          />
        </div>
        <button class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center" type="submit">
          Submit
        </button>
      </form>
      {todos.map((todo) => {
        return (
          <p class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2">
            {todo.title}
            <button class="font-medium" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </p>
        )
      })}
    </div>
  )
}
