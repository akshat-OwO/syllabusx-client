import { ArrowLeftCircleIcon, ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import NoData from "./NoData";

const Syllabus = (props) => {
    const [down, setDown] = useState(0)
    const [currentTab, setCurrentTab] = useState('Theory');

    const data = props.showcase;

    const goBack = () => {
        props.setSearching(true);
        props.setSubjectShow(false);
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
    }

    return (
        <div className="syllabus">
            <ArrowLeftCircleIcon className="back-btn" onClick={goBack} />
            <div className="tabs">
                <div className={`tab ${currentTab==='Theory' ? 'tab-selected' : ''}`} onClick={changeTab}>Theory</div>
                <div className={`tab ${currentTab==='Lab' ? 'tab-selected' : ''}`} onClick={changeTab}>Lab</div>
                <div className={`tab ${currentTab==='Notes' ? 'tab-selected' : ''}`} onClick={changeTab}>Notes</div>
            </div>
            <div className="syll-header">
                <h1>{data.subject}</h1>
                <p>Better to complete it now than later!</p>
            </div>
            <div className="syll-tags">
                <h3>Theory Code <span>{`${(data.theorypapercode) ? data.theorypapercode : 'N/A'}`}</span></h3>
                <h3>Theory Credits <span>{`${(data.theorycredits) ? data.theorycredits : 'N/A'}`}</span></h3>
                <h3>Lab Code <span>{`${(data.labpapercode) ? data.labpapercode : 'N/A'}`}</span></h3>
                <h3>Lab Credits <span>{`${(data.labcredits) ? data.labcredits : 'N/A'}`}</span></h3>
            </div>
            {!props.nullData ? (data.theory && (<div className="syll-theory">
                {
                    data.theory.map(t => (
                        <div key={t.unit}>
                            <div className="unit-head" key={t.unit} onClick={() => dropdown(t.unit)}>
                                <h3>Unit - {t.unit}</h3>
                                {((down == 0) && ( t.unit == window.clickedUnit))?
                                    <ChevronUpIcon className="drop-icon"/>: <ChevronDownIcon className="drop-icon" />
                                }
                            </div>

                            {((down == 0) && (t.unit == window.clickedUnit)) && (
                                <div className="topics">
                                    {
                                        t.topics.map(p => (
                                            <div className="topic-items" key={p}>
                                                <StopCircleIcon className="drop-icon bullet"/>
                                                <li>{p}</li>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>)) : <NoData />}
        </div>
    );
}
 
export default Syllabus;