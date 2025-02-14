import { useState } from 'react'
import Logo from './Logo.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [liked, setLiked]=useState(false)

  return (
    <> 
    <Logo />
 
      
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={()=>setLiked((like)=>(!like))}>
      {liked ? 'liked':'Dislike'}
      </button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
