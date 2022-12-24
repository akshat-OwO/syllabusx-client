import NoData from "../NoData";

const SyllNote = ({
    currentTab,
    data,
    drive,
    dropdown,
    down
}) => {
    return (
        <div>
            {currentTab === 'Notes' && (drive.length > 0) ? (<div className="syll-notes">
                {drive.map(d => (
                    <div className="note-title" key={d.id}>
                        <a href={d.webViewLink} target="_blank" rel="noopener noreferrer">{d.name}</a>
                    </div>
                ))}
            </div>): (currentTab === 'Notes' && (<NoData />))}
        </div>
    );
}
 
export default SyllNote;