import { BeakerIcon, ChevronLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

const SyllHead = ({
    goBack,
    changeTab,
    data,
    currentTab
}) => {
    return (
        <div>
            
                <div className="tabs">
                    <ChevronLeftIcon className="icon back-btn" onClick={goBack} />
                    <button className={`tab ${currentTab==='Theory' ? 'tab-selected' : ''}`} onClick={changeTab} data-tab='Theory'>
                        <BookOutlinedIcon data-tab='Theory' className="icon" /> <span data-tab='Theory'>Theory</span>
                    </button>
                    <button className={`tab ${currentTab==='Lab' ? 'tab-selected' : ''}`} onClick={changeTab} data-tab='Lab'>
                        <BeakerIcon data-tab='Lab' className="icon" /> <span data-tab='Lab'>Lab</span>
                    </button>
                    <button className={`tab ${currentTab==='Notes' ? 'tab-selected' : ''}`} onClick={changeTab} data-tab='Notes'>
                        <PencilSquareIcon data-tab='Notes' className="icon" /> <span data-tab='Notes'>Notes</span>
                    </button>
                    <button className={`tab ${currentTab==='PYQ' ? 'tab-selected' : ''}`} onClick={changeTab} data-tab='PYQ'>
                        <QuestionMarkOutlinedIcon data-tab='PYQ' className="icon" /> <span data-tab='PYQ'>PYQ</span>
                    </button>
                    <button className={`tab ${currentTab==='Books' ? 'tab-selected' : ''}`} onClick={changeTab} data-tab='Books'>
                    <LibraryBooksOutlinedIcon className='icon' data-tab='Books' /> <span data-tab='Books'>Books</span>
                    </button>
                    <button className={`tab ${currentTab==='PracticalFile' ? 'tab-selected' : ''}`} onClick={changeTab} data-tab='PracticalFile'>
                        <FileCopyOutlinedIcon data-tab='PracticalFile' className='icon' /> <span data-tab='PracticalFile'>Practicals</span>
                    </button>
                </div>
                <div className="syll-header">
                    <h1>{data.subject}</h1>
                </div>
                <div className="syll-tags">
                    <div className="tag-title">
                        <h3>Theory Code</h3>
                        <h3>Theory Credits</h3>
                        <h3>Lab Code</h3>
                        <h3>Lab Credits</h3>
                    </div>
                    <div className="tags">
                        <h3>{`${(data.theorypapercode) ? data.theorypapercode : 'N/A'}`}</h3>
                        <h3>{`${(data.theorycredits) ? data.theorycredits : 'N/A'}`}</h3>
                        <h3>{`${(data.labpapercode) ? data.labpapercode : 'N/A'}`}</h3>
                        <h3>{`${(data.labcredits) ? data.labcredits : 'N/A'}`}</h3>
                    </div>
                    <h3 className="laptop-only">Theory Code <span>{`${(data.theorypapercode) ? data.theorypapercode : 'N/A'}`}</span></h3>
                    <h3 className="laptop-only">Theory Credits <span>{`${(data.theorycredits) ? data.theorycredits : 'N/A'}`}</span></h3>
                    <h3 className="laptop-only">Lab Code <span>{`${(data.labpapercode) ? data.labpapercode : 'N/A'}`}</span></h3>
                    <h3 className="laptop-only">Lab Credits <span>{`${(data.labcredits) ? data.labcredits : 'N/A'}`}</span></h3>
                </div>
        </div>
    );
}
 
export default SyllHead;