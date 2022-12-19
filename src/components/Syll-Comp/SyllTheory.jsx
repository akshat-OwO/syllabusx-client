import { ChevronDownIcon, ChevronUpIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import NoData from "../NoData";

const SyllTheory = ({
    currentTab,
    data,
    dropdown,
    down
}) => {
    return (
        <div>
            {currentTab === 'Theory' && (data.theory.length > 0) ? (data.theory && (<div className="syll-theory">
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
                </div>)) : (currentTab === 'Theory' && (<NoData />))}
        </div>
    );
}
 
export default SyllTheory;