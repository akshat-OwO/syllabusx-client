import BranchButton from "./formFields/BranchButton";
import SemButton from "./formFields/SemButton";
import FeedbackLink from "./siteInfo/FeedbackLink";
import Logo from "../assets/LogoV3.svg";

const Nav = (props) => {
    return (
        <div className="nav">
          <img  className="heading" src={Logo} alt=""/>
          {/* <div className="heading">

            <h1>SYLLABUSX<span className="underline"></span></h1>
            <p>Stay organized and informed about the course material and expectations</p>
          </div>
          <div className="info info-left laptop-only">
            <h4>PYQs AND MORE HELPFUL MATERIAL COMING SOON...</h4>
          </div>  */}
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
          <div className="info info-right laptop-only">
            {/* <h4>HELP US ADD MORE VALUE TO THIS PROJECT</h4> */}
          </div>
          <FeedbackLink />
      </div>
    );
}
 
export default Nav;