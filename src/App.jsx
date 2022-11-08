import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import SemButton from './components/formFields/SemButton';
import BranchButton from './components/formFields/BranchButton';

function App() {
  const [sem, setSem] = useState('');
  const [semShow, setSemShow] = useState('Sem');
  const [branch, setBranch] = useState('');
  const [branchShow, setBranchShow] = useState('Branch');

  const [searching, setSearching] = useState(false);

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

    if (sem !== '' && branch !== '') {
      const nav = document.querySelector('.nav');
      const heading = document.querySelector('.heading');
      const buttons = document.querySelector('.buttons');
      nav.style.display = 'flex';
      nav.style.justifyContent = 'space-between';
      nav.style.minHeight = '10vh';
      nav.style.background = 'var(--bg)';
      buttons.style.position = 'relative';
      buttons.style.right = '25vw';
      buttons.style.marginTop = '0';
      buttons.style.gap = '25vw';
      heading.firstChild.style.fontSize = 'calc(var(--_size) * 2.5)';
      heading.firstChild.style.paddingLeft = 'var(--_size)';
      heading.firstChild.style.position = 'relative';
      heading.firstChild.style.left = '37.5vw';
      heading.lastChild.style.display = 'none';
      
    }
  }, [sem, branch]);

  return (
    <div className="body">
      <div id="trailer"></div>
      <div className="nav">
        {/* <div className="search">
          <MagnifyingGlassIcon className='h-24 w-24' />
        </div> */}
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
            branchShow={branchShow}
            setBranchShow={setBranchShow}
          />
        </form>
      </div>
    </div>
  )
}

export default App
