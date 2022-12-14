import LoadData from "../LoadData";
import NoData from "../NoData";

const SyllNote = ({
    currentTab,
    data,
    drive
}) => {
    return (
        <div>
            {drive.length > 0 ? (currentTab === 'Notes' && (drive.length > 0) ? (
            <div className="syll-notes">
                {drive.map(d => (
                        <a href={d.webViewLink} target="_blank" rel="noopener noreferrer" className="note-title" key={d.id} >{d.name}</a>
                ))}
            </div>
            ): (currentTab === 'Notes' && (<NoData />))) : (currentTab === 'Notes' && (data.camel ? (<LoadData />): <NoData />))}
        </div>
    );
}
 
export default SyllNote;