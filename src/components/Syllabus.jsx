import { useState } from "react";
import useDrive from "../hooks/useDrive";
import SyllHead from "./Syll-Comp/SyllHead";
import SyllLab from "./Syll-Comp/SyllLab";
import SyllNote from "./Syll-Comp/SyllNote";
import SyllTheory from "./Syll-Comp/SyllTheory";

const Syllabus = (props) => {
    const [drive, setDrive] = useState([]);
    const [currentTab, setCurrentTab] = useState('Theory');

    const data = props.showcase;
    let query = data.camel;
    useDrive(query, currentTab, setDrive);

    const goBack = () => {
        props.setSearching(true);
        props.setSubjectShow(false);
    }

    const changeTab = (e) => {
        setCurrentTab(e.target.dataset.tab);
    }

    return (
        <div className="syllabus">
            <SyllHead 
                goBack={goBack}
                changeTab={changeTab}
                data={data}
                currentTab={currentTab}
            />
            
            <SyllTheory 
                data={data}
                currentTab={currentTab}
            />

            <SyllLab 
                data={data}
                currentTab={currentTab}
            />
            
            <SyllNote
                data={data}
                drive={drive}
                currentTab={currentTab}
            />
        </div>
    );
}
 
export default Syllabus;