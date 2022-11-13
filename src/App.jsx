import { useState, useEffect } from 'react'
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import SemButton from './components/formFields/SemButton';
import BranchButton from './components/formFields/BranchButton';

function App() {
  const [sem, setSem] = useState('');
  const [semShow, setSemShow] = useState('Sem');
  const [branch, setBranch] = useState('');
  const [branchShow, setBranchShow] = useState('Branch');
  const [data, setData] = useState([]);

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
      heading.style.alignSelf = 'center';
      heading.firstChild.style.position = 'relative';
      heading.firstChild.style.left = '40vw';
      heading.lastChild.style.display = 'none';
      
      setTimeout(() => {
        setSearching(true);
      }, 1000);
    }
  }, [sem, branch]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://iboard-web-server.cyclic.app/${sem}/${branch}`);
      const json = await response.json();
      setData(json);
    }
    getData();
  }, [searching]);

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
      {searching ? (
        <div className="subjects hidden">
          <div className="sub-header">
            <h1>Subjects</h1>
            <p>Better to complete it now then later!</p>
          </div>
          <div className="sub-wrapper">
            {
              data.length && (
                data.map(d => (
                  <div className="sub-title">{d.subject}</div>
                ))
              )
            }
          </div>
        </div>
      ) : <></>}
    </div>
  )
}

export default App
