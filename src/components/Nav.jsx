import BranchButton from "./formFields/BranchButton";
import SemButton from "./formFields/SemButton";
import FeedbackLink from "./siteInfo/FeedbackLink";

const Nav = (props) => {
    return (
        <div className="nav">
          <div className="heading">
            <h1>SYLLABUSX<span className="underline"></span></h1>
            <p>Stay organized and informed about the course material and expectations</p>
          </div>
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
          <FeedbackLink />
      </div>
    );
}
 
export default Nav;