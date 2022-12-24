import { useState } from "react";
import useDrive from "../hooks/useDrive";
import SyllHead from "./Syll-Comp/SyllHead";
import SyllLab from "./Syll-Comp/SyllLab";
import SyllNote from "./Syll-Comp/SyllNote";
import SyllTheory from "./Syll-Comp/SyllTheory";

const Syllabus = (props) => {
    const [down, setDown] = useState(0)
    const [drive, setDrive] = useState([]);
    const [currentTab, setCurrentTab] = useState('Theory');

    const data = props.showcase;
    let query = data.camel;
    useDrive(query, currentTab, setDrive);

    const goBack = () => {
        props.setSearching(true);
        props.setSubjectShow(false);
        setDown(0);
        window.clickedUnit = null;
    }

    function dropdown(clickedUnit){
        if (down == 0) {
            window.clickedUnit = clickedUnit
            setDown(1);
        }
        else {
            window.clickedUnit = clickedUnit
            setDown(0);
        }
    }

    const changeTab = (e) => {
        setCurrentTab(e.target.innerHTML);
        setDown(0);
        window.clickedUnit = null;
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
                dropdown={dropdown}
                currentTab={currentTab}
                down={down}
            />

            <SyllLab 
                data={data}
                dropdown={dropdown}
                currentTab={currentTab}
                down={down}
            />
            
            <SyllNote
                data={data}
                drive={drive}
                dropdown={dropdown}
                currentTab={currentTab}
                down={down}
            />
        </div>
    );
}
 
export default Syllabus;