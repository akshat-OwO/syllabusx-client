import LoadData from "../LoadData";
import NoData from "../NoData";

const SyllBooks = ({
    currentTab,
    data,
    book
}) => {
    return (
        <div>
            {book.length > 0 ? (currentTab === 'Books' && (book.length > 0) ? (
                <div className="syll-books">
                    {book.map(p => (
                            <a href={p.webViewLink} target="_blank" rel="noopener noreferrer" className={`book-title ${p.description ? p.description.includes('new') ? 'shine' : '' : '' }`} key={p.id}>{p.name.slice(0, -4)}</a>
                    ))}
                </div>
            ): (currentTab === 'Books' && (<NoData />))) : (currentTab === 'Books' && (data.book ? (<LoadData />): <NoData />))}
        </div>
    );
}
 
export default SyllBooks;