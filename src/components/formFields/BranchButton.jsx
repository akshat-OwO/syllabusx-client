const BranchButton = ({ branch, setBranch, branchShow, setBranchShow }) => {

    const toggleBranch = (e) => {
        e.preventDefault();
        const options = document.querySelector('.branches');
        options.classList.toggle('hide');
    }

    const selectBranch = (e) => {
        setBranch(e.target.dataset.value);
        setBranchShow(e.target.dataset.value);
        const options = document.querySelector('.branches');
        options.classList.toggle('hide');
    }

    return (
        <div className="option-wrapper branch-btn" id="branch-btn">
            <button className='btn' tabIndex={2} onClick={toggleBranch}>{branchShow}</button>
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