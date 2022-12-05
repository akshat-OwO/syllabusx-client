import { ArrowLeftCircleIcon, ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const Syllabus = (props) => {

    const goBack = () => {
        props.setSearching(true);
        props.setSubjectShow(false);
    }

    return (
        <div className="syllabus">
            <ArrowLeftCircleIcon className="back-btn" onClick={goBack} />
            <div className="syll-header">
                <h1>{props.showcase.subject}</h1>
                <p>Better to complete it now then later!</p>
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
                        <div className="unit-head" key={t.unit}>
                            <h3>Unit - {t.unit}</h3>
                            <ChevronDownIcon className="drop-icon" />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
 
export default Syllabus;