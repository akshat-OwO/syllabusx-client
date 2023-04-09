const SemButton = ({ sem, semShow, setSem, setSemShow }) => {

    const toggleSem = (e) => {
        e.preventDefault();
        const options = document.querySelector('.semesters');
        options.classList.toggle('hide');
    }

    const selectSem = (e) => {
        setSem(e.target.dataset.value);
        setSemShow(e.target.dataset.show);
        const options = document.querySelector('.semesters');
        options.classList.toggle('hide');
    }
    
    return (
        <div className="option-wrapper sem-btn" id="sem-btn">
            <button className='btn' tabIndex={1} onClick={toggleSem}>{semShow}</button>
            <div className="options semesters hide">
              <p data-show="1st" data-value="firstsemesters" onClick={selectSem}>1st</p>
              <p data-show="2nd" data-value="secondsemesters" onClick={selectSem}>2nd</p>
              <p data-show="3rd" data-value="thirdsemesters" onClick={selectSem}>3rd</p>
              <p data-show="4th" data-value="fourthsemesters" onClick={selectSem}>4th</p>
              <p data-show="5th" data-value="fifthsemesters" onClick={selectSem}>5th</p>
              <p data-show="6th" data-value="sixthsemesters" onClick={selectSem}>6th</p>
              <p data-show="7th" data-value="seventhsemesters" onClick={selectSem}>7th</p>
              <p data-show="8th" data-value="eighthsemesters" onClick={selectSem}>8th</p>
            </div>
        </div>
    );
}
 
export default SemButton;
