import { useEffect, useState } from 'react';

import Nav from './components/Nav';
import Subjects from './components/Subjects';
import Syllabus from './components/Syllabus';
import Footer from './components/siteInfo/Footer';
import PopHeader from './components/siteInfo/PopHeader';
import useData from './hooks/useData';
import useNull from './hooks/useNull';
import useTrailer from './hooks/useTrailer';
import useTransform from './hooks/useTransform';

function App() {
  const [sem, setSem] = useState('');
  const [semShow, setSemShow] = useState('Semester');
  const [branch, setBranch] = useState('');
  const [branchShow, setBranchShow] = useState('Branch');
  const [data, setData] = useState([]);

  const [showcase, setShowcase] = useState({});

  const [subjectShow, setSubjectShow] = useState(false);
  const [searching, setSearching] = useState(false);
  const [nullData, setNullData] = useState(false);

  // custom hooks
  // useTrailer();
  useTransform(sem, branch, setSearching);
  useData(setData, searching, sem, branch);
  useNull(setNullData, data);

  return (
    <div className="body">
      {/* <PopHeader /> */}
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
      <Footer />
      {searching ? (
          <Subjects
            data={data}
            nullData={nullData}
            showcase={showcase}
            setShowcase={setShowcase}
            setSearching={setSearching}
            setSubjectShow={setSubjectShow}
          />
      ) : <></>}
      {(!searching && subjectShow) ? (
        <Syllabus
          nullData={nullData}
          showcase={showcase}
          setSearching={setSearching}
          setSubjectShow={setSubjectShow}
        />
      ) : <></>}
    </div>
  )
}

export default App
