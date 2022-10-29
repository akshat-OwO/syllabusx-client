import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import SemButton from './components/formFields/SemButton';
import BranchButton from './components/formFields/BranchButton';

function App() {
  const [sem, setSem] = useState('Sem');
  const [semShow, setSemShow] = useState('Sem');
  const [branch, setBranch] = useState('Branch');

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
