import { ChevronDownIcon, ChevronUpIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import NoData from "../NoData";

const SyllLab = ({
    currentTab,
    data,
    dropdown,
    down
}) => {
    return (
        <div>
            {currentTab === 'Lab' && (data.lab.length > 0) ? (data.lab && (<div className="syll-lab">
                {
                    data.lab.map(l => (
                        <div key={l.experiment}>
                            <div className="lab-head" key={l.experiment} onClick={() => dropdown(l.experiment)}>
                                <div className="lab-heads">
                                    <h3>Experiment - {l.experiment}</h3>
                                    <h4><span>Objective</span> - {l.aim.objective}</h4>
                                </div>
                                {(l.aim.steps.length > 0 && (down == 0) && (l.experiment == window.clickedUnit)) ?
                                    <ChevronUpIcon className="drop-icon"/>: (l.aim.steps.length > 0 && <ChevronDownIcon className="drop-icon" />)
                                }
                            </div>
                            {((down == 0) && (l.experiment == window.clickedUnit)) && (l.aim.steps.length > 0) && (
                                <div className="steps">
                                    {
                                        l.aim.steps.map(s => (
                                            <div className="step-items" key={s}>
                                                <StopCircleIcon className="drop-icon bullet"/>
                                                <li>{s}</li>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>)): (currentTab === 'Lab' && (<NoData />))}
        </div>
    );
}
 
export default SyllLab;