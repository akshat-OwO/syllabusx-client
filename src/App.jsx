import { useState, useEffect } from 'react'
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import useTrailer from './hooks/useTrailer';
import Nav from './components/Nav';
import Subjects from './components/Subjects';
import useTransform from './hooks/useTransform';
import useData from './hooks/useData';
import Syllabus from './components/Syllabus';
import useNull from './hooks/useNull';
import PopHeader from './components/siteInfo/PopHeader';
import Footer from './components/siteInfo/Footer';

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
      {/* <div id="trailer"></div> */}
      {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs" width="1440" height="560" preserveAspectRatio="none" viewBox="0 0 1440 560"><g mask="url(&quot;#SvgjsMask1006&quot;)" fill="none"><path d="M 0,223 C 57.6,179.8 172.8,5.6 288,7 C 403.2,8.4 460.8,215.2 576,230 C 691.2,244.8 748.8,89.8 864,81 C 979.2,72.2 1036.8,186.6 1152,186 C 1267.2,185.4 1382.4,99.6 1440,78L1440 560L0 560z" fill="hsl(var(--_hue) 41% 45%)"></path><path d="M 0,550 C 96,510 288,375 480,350 C 672,325 768,424.6 960,425 C 1152,425.4 1344,366.6 1440,352L1440 560L0 560z" fill="hsl(calc(var(--_hue) - 4) 52% 53%)"></path></g><defs><mask id="SvgjsMask1006"><rect width="1440" height="560" fill="#ffffff"></rect></mask></defs></svg> */}
      <PopHeader />
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
      {/* {(!searching && subjectShow) ? (
        <Syllabus
          nullData={nullData}
          showcase={showcase}
          setSearching={setSearching}
          setSubjectShow={setSubjectShow}
        />
      ) : <></>} */}
    </div>
  )
}

export default App
