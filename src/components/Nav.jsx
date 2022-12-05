import BranchButton from "./formFields/BranchButton";
import SemButton from "./formFields/SemButton";

const Nav = (props) => {
    return (
        <div className="nav">
        {/* <div className="search">
          <MagnifyingGlassIcon className='h-24 w-24' />
        </div> */}
        <div className="heading">
          <h1>i-board</h1>
          <p>This is the best dashboard for students akkad bakkad bambe bo</p>
        </div>
        <form className="buttons">
          <SemButton
            sem={props.sem} 
            semShow={props.semShow} 
            setSem={props.setSem} 
            setSemShow={props.setSemShow} 
          />
          <BranchButton
            branch={props.branch}
            setBranch={props.setBranch}
            branchShow={props.branchShow}
            setBranchShow={props.setBranchShow}
          />
        </form>
      </div>
    );
}
 
export default Nav;