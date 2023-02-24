import LoadData from "../LoadData";
import NoData from "../NoData";

const SyllPractical = ({
    currentTab,
    data,
    practical
}) => {
    return (
        <div>
            {practical.length > 0 ? (currentTab === 'PracticalFile' && (practical.length > 0) ? (
            <div className="syll-practicals">
                {practical.map(d => (
                        <a href={d.webViewLink} target="_blank" rel="noopener noreferrer" className="practical-title" key={d.id} >{d.name.slice(0, -4)}</a>
                ))}
            </div>
            ): (currentTab === 'PracticalFile' && (<NoData />))) : (currentTab === 'PracticalFile' && (data.practical ? (<LoadData />): <NoData />))}
        </div>
    );
}
 
export default SyllPractical;