import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="body">
      <div className="nav">
        <div className="search">
          <MagnifyingGlassIcon className='h-24 w-24' />
        </div>
        <div className="heading">
          <h1>i-board</h1>
          <p>This is the best dashboard for students akkad bakkad bambe bo</p>
        </div>
        <div className="buttons">
          <button className="btn">Sem</button>
          <button className="btn">Branch</button>
        </div>
      </div>
    </div>
  )
}

export default App
