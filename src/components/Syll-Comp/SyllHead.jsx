import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const SyllHead = ({
    goBack,
    changeTab,
    data,
    currentTab
}) => {
    return (
        <div>
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
        </div>
    );
}
 
export default SyllHead;