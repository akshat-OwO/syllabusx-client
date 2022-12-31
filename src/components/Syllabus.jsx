import { useState } from "react";
import useBooks from "../hooks/useBooks";
import useNotes from "../hooks/useNotes";
import usePracticals from "../hooks/usePracticals";
import usePyqs from "../hooks/usePyqs";
import SyllBooks from "./Syll-Comp/SyllBooks";
import SyllHead from "./Syll-Comp/SyllHead";
import SyllLab from "./Syll-Comp/SyllLab";
import SyllNote from "./Syll-Comp/SyllNote";
import SyllPractical from "./Syll-Comp/SyllPractical";
import SyllPyq from "./Syll-Comp/SyllPyq";
import SyllTheory from "./Syll-Comp/SyllTheory";

const Syllabus = (props) => {
    const [drive, setDrive] = useState([]);
    const [pyq, setPyq] = useState([]);
    const [book, setBook] = useState([]);
    const [practical, setPractical] = useState([]);
    const [currentTab, setCurrentTab] = useState('Theory');

    const data = props.showcase;
    let query = data.camel;
    let pyqQuery = data.pvq;
    let bookQuery = data.book;
    let practicalQuery = data.practical;
    useNotes(query, currentTab, setDrive);
    usePyqs(pyqQuery, currentTab, setPyq);
    useBooks(bookQuery, currentTab, setBook);
    usePracticals(practicalQuery, currentTab, setPractical);

    const goBack = () => {
        props.setSearching(true);
        props.setSubjectShow(false);
    }

    const changeTab = (e) => {
        setCurrentTab(e.target.dataset.tab);
    }

    return (
        <div className="syllabus">
            <SyllHead 
                goBack={goBack}
                changeTab={changeTab}
                data={data}
                currentTab={currentTab}
            />
            
            <SyllTheory 
                data={data}
                currentTab={currentTab}
            />

            <SyllLab 
                data={data}
                currentTab={currentTab}
            />
            
            <SyllNote
                data={data}
                drive={drive}
                currentTab={currentTab}
            />

            <SyllPyq
                data={data}
                pyq={pyq}
                currentTab={currentTab}
            />

            <SyllBooks 
                data={data}
                book={book}
                currentTab={currentTab}
            />

            <SyllPractical 
                data={data}
                practical={practical}
                currentTab={currentTab}
            />
        </div>
    );
}
 
export default Syllabus;