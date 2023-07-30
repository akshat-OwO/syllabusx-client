
const SemButton = ({ sem, semShow, setSem, setSemShow }) => {

    const toggleSem = (e) => {
        e.preventDefault();
        const options = document.querySelector('.semesters');
        const semBtnPressed = document.querySelector('.option-wrapper-sem')
        options.classList.toggle('hide');
        semBtnPressed.classList.toggle('semBtnPressed');
    }

    const selectSem = (e) => {
        setSem(e.target.dataset.value);
        setSemShow(e.target.dataset.show);
        const options = document.querySelector('.semesters');
        options.classList.toggle('hide');
    }
    
    return (
        <div className="option-wrapper-sem sem-btn" id="sem-btn">
            <button className='btn' tabIndex={1} onClick={toggleSem}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="down-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                {semShow}
            </button>
            <div className="options semesters hide">
                <p data-show="1st" data-value="firstsemesters" onClick={selectSem}>First</p>
                <p data-show="2nd" data-value="secondsemesters" onClick={selectSem}>Second</p>
                <p data-show="3rd" data-value="thirdsemesters" onClick={selectSem}>Third</p>
                <p data-show="4th" data-value="fourthsemesters" onClick={selectSem}>Fourth</p>
                {/* <p data-show="5th" data-value="fifthsemesters" onClick={selectSem}>5th</p>
                <p data-show="6th" data-value="sixthsemesters" onClick={selectSem}>6th</p>
                <p data-show="7th" data-value="seventhsemesters" onClick={selectSem}>7th</p>
                <p data-show="8th" data-value="eighthsemesters" onClick={selectSem}>8th</p> */}
            </div>
        </div>
    );
}
 
export default SemButton;