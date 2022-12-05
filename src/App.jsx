import { useState, useEffect } from 'react'
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import useTrailer from './hooks/useTrailer';
import Nav from './components/Nav';
import Subjects from './components/Subjects';
import useTransform from './hooks/useTransform';
import useData from './hooks/useData';
import Syllabus from './components/Syllabus';

function App() {
  const [sem, setSem] = useState('');
  const [semShow, setSemShow] = useState('Sem');
  const [branch, setBranch] = useState('');
  const [branchShow, setBranchShow] = useState('Branch');
  const [data, setData] = useState([]);

  const [showcase, setShowcase] = useState({});

  const [subjectShow, setSubjectShow] = useState(false);
  const [searching, setSearching] = useState(false);

  // custom hooks
  useTrailer();
  useTransform(sem, branch, setSearching);
  useData(setData, searching, sem, branch);

  return (
    <div className="body">
      <div id="trailer"></div>
      <Nav 
        sem={sem} 
        semShow={semShow} 
        setSem={setSem} 
        setSemShow={setSemShow}
        branch={branch}
        setBranch={setBranch}
        branchShow={branchShow}
        setBranchShow={setBranchShow}
      />
      {searching ? (
        <Subjects
          data={data}
          showcase={showcase}
          setShowcase={setShowcase}
          setSearching={setSearching}
          setSubjectShow={setSubjectShow}
        />
      ) : <></>}
      {subjectShow ? (
        <Syllabus
          showcase={showcase}
          setSearching={setSearching}
          setSubjectShow={setSubjectShow}
        />
      ) : <></>}
    </div>
  )
}

export default App
