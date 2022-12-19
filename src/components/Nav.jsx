import BranchButton from "./formFields/BranchButton";
import SemButton from "./formFields/SemButton";

const Nav = (props) => {
    return (
        <div className="nav">
        <form className="buttons">
          <SemButton
            sem={props.sem} 
            semShow={props.semShow} 
            setSem={props.setSem} 
            setSemShow={props.setSemShow} 
          />
          <div className="heading">
            <h1>Syllabus-X</h1>
            <h2>Stay organized and informed about the course material and expectations</h2>
          </div>
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