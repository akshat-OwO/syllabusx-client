import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import SemButton from './components/formFields/SemButton';
import BranchButton from './components/formFields/BranchButton';

function App() {
  const [sem, setSem] = useState('Sem');
  const [semShow, setSemShow] = useState('Sem');
  const [branch, setBranch] = useState('Branch');

  useEffect(() => {
    const trailer = document.getElementById('trailer');

    window.onmousemove = (e) => {
      const x = e.clientX - trailer.offsetWidth / 2;
      const y = e.clientY - trailer.offsetWidth / 2;

      const keyframes = {
        transform: `translate(${x}px, ${y}px)`
      }

      trailer.animate(keyframes, {
        duration: 800,
        fill: 'forwards'
      });
    }
  }, []);

  return (
    <div className="body">
      <div id="trailer"></div>
      <div className="nav">
        <div className="search">
          <MagnifyingGlassIcon className='h-24 w-24' />
        </div>
        <div className="heading">
          <h1>i-board</h1>
          <p>This is the best dashboard for students akkad bakkad bambe bo</p>
        </div>
        <form className="buttons">
          <SemButton 
            sem={sem} 
            semShow={semShow} 
            setSem={setSem} 
            setSemShow={setSemShow} 
          />
          <BranchButton 
            branch={branch}
            setBranch={setBranch}
          />
        </form>
      </div>
    </div>
  )
}

export default App
