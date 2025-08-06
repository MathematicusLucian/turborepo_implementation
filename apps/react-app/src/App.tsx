import { useState } from 'react'
import { useShape } from '@electric-sql/react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { data } = useShape({
    url: `http://localhost:3000/v1/shape`,
    params: {
      table: `scores`
    }
  })

  return (
    <>
      <div>
        <h1>Vite + React</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>  <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
