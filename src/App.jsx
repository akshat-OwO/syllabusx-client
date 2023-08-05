import { useState, useEffect } from "react";

import useTrailer from "./hooks/useTrailer";
import Nav from "./components/Nav";
import Subjects from "./components/Subjects";
import useTransform from "./hooks/useTransform";
import useData from "./hooks/useData";
import Syllabus from "./components/Syllabus";
import useNull from "./hooks/useNull";
import PopHeader from "./components/siteInfo/PopHeader";
import Footer from "./components/siteInfo/Footer";

function App() {
  const [sem, setSem] = useState("");
  const [semShow, setSemShow] = useState("Semester");
  const [branch, setBranch] = useState("");
  const [branchShow, setBranchShow] = useState("Branch");
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
    // <div className="body">
    //   <PopHeader />
    //   <Nav
    //     sem={sem}
    //     semShow={semShow}
    //     setSem={setSem}
    //     setSemShow={setSemShow}
    //     branch={branch}
    //     setBranch={setBranch}
    //     branchShow={branchShow}
    //     setBranchShow={setBranchShow}
    //   />
    //   <Footer />
    //   {searching ? (
    //       <Subjects
    //         data={data}
    //         nullData={nullData}
    //         showcase={showcase}
    //         setShowcase={setShowcase}
    //         setSearching={setSearching}
    //         setSubjectShow={setSubjectShow}
    //       />
    //   ) : <></>}
    //   {(!searching && subjectShow) ? (
    //     <Syllabus
    //       nullData={nullData}
    //       showcase={showcase}
    //       setSearching={setSearching}
    //       setSubjectShow={setSubjectShow}
    //     />
    //   ) : <></>}
    // </div>
    <div className="body">
      <div className="null-data">
        <h1>Maintenance Break🛠️</h1>
        <h3>SyllabusX is under maintenance this weekend </h3>
        <h6>v3 coming..</h6>
        <img src="/syllx-mascot.webp" alt="" />
      </div>
    </div>
  );
}

export default App;
