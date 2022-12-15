import { ArrowLeftCircleIcon, ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Syllabus = (props) => {

    const goBack = () => {
        props.setSearching(true);
        props.setSubjectShow(false);
    }
    const [down, setDown] = useState(0)

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

    return (
        <div className="syllabus">
            <ArrowLeftCircleIcon className="back-btn" onClick={goBack} />
            <div className="syll-header">
                <h1>{props.showcase.subject}</h1>
                <p>Better to complete it now than later!</p>
            </div>
            <div className="syll-tags">
                <h3>Theory Code <span>{`${(props.showcase.theorypapercode) ? props.showcase.theorypapercode : 'N/A'}`}</span></h3>
                <h3>Theory Credits <span>{`${(props.showcase.theorycredits) ? props.showcase.theorycredits : 'N/A'}`}</span></h3>
                <h3>Lab Code <span>{`${(props.showcase.labpapercode) ? props.showcase.labpapercode : 'N/A'}`}</span></h3>
                <h3>Lab Credits <span>{`${(props.showcase.labcredits) ? props.showcase.labcredits : 'N/A'}`}</span></h3>
            </div>
            <div className="syll-theory">
                {
                    props.showcase.theory.map(t => (
                        <div>
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
                                            <div className="topic-items">
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
            </div>
        </div>
    );
}
 
export default Syllabus;