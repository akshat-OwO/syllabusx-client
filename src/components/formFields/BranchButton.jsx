const BranchButton = ({ branch, setBranch, branchShow, setBranchShow }) => {

    const toggleBranch = (e) => {
        e.preventDefault();
        const options = document.querySelector('.branches');
        const branchBtnPressed = document.querySelector('.option-wrapper-branch')
        options.classList.toggle('hide');
        branchBtnPressed.classList.toggle('branchBtnPressed');
    }

    const selectBranch = (e) => {
        setBranch(e.target.dataset.value);
        setBranchShow(e.target.dataset.value);
        const options = document.querySelector('.branches');
        options.classList.toggle('hide');
    }

    return (
        <div className="option-wrapper-branch branch-btn" id="branch-btn">
            <button className='btn' tabIndex={2} onClick={toggleBranch}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="down-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              {branchShow}
            </button>
            <div className="options branches hide">
              <p data-value="CSE" onClick={selectBranch}>CSE</p>
              <p data-value="IT" onClick={selectBranch}>IT</p>
              <p data-value="ECE" onClick={selectBranch}>ECE</p>
              <p data-value="EEE" onClick={selectBranch}>EEE</p>
              <p data-value="ICE" onClick={selectBranch}>ICE</p>
            </div>
        </div>
    );
}
 
export default BranchButton;