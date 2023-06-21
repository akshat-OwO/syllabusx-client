import LoadData from "../LoadData";
import NoData from "../NoData";

const SyllPyq = ({
    currentTab,
    data,
    pyq
}) => {
    return (
        <div>
            {pyq.length > 0 ? (currentTab === 'PYQ' && (pyq.length > 0) ? (
                <div className="syll-pyqs">
                    {pyq.map(p => (
                            <a href={p.webViewLink} target="_blank" rel="noopener noreferrer" className={`pyq-title ${p.description ? p.description.includes('new') ? 'shine' : '' : '' }`} key={p.id}>{p.name.slice(0, -4)}</a>
                    ))}
                </div>
            ): (currentTab === 'PYQ' && (<NoData />))) : (currentTab === 'PYQ' && (data.pYq ? (<LoadData />): <NoData />))}
        </div>
    );
}
 
export default SyllPyq;