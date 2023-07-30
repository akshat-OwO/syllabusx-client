import Logo from "./Logo";
import SearchForm from "./SearchForm";
import FeedbackLink from "./siteInfo/FeedbackLink";

const Nav = () => {

    return (
        <div className="nav">
          <Logo />
          <SearchForm />
          <FeedbackLink />
      </div>
    );
}
 
export default Nav;