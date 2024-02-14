import { hc } from 'hono/client'
import { useState } from 'hono/jsx'
import type { AppType } from '../routes/api'

export default function Component() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('no message')
  const client = hc<AppType>('/api')

  const fetchApi = async () => {
    const res = await client.echo.$get({
      query: {
        name
      }
    })
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Your Name"
        onChange={(e) => setName((e.target as HTMLInputElement).value)}
      />
      <button onClick={() => fetchApi()}>Send</button>
      <div>{message}</div>
    </div>
  )
}
