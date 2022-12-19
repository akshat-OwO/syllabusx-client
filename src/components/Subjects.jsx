import NoData from "./NoData";

const Subjects = (props) => {

  const handleShowSubject = (e) => {
    props.data.map(d => {
      if (e.target.textContent === d.subject) {
        props.setShowcase(d);
        props.setSearching(false);
        props.setSubjectShow(true);
      }
    });
  }

    return (
      <div className="subjects hidden">
      <div className="sub-header">
        <h1>Subjects</h1>
        <p>Better to complete it now than later!</p>
      </div>
      {!props.nullData ? (<div className="sub-wrapper">
        {
          props.data.length && (
            props.data.map(d => (
              <div className="sub-title" key={d._id} onClick={handleShowSubject}>{d.subject}</div>
            ))
          )
        }
      </div>) : <NoData />}
    </div>
    );
}
 
export default Subjects;
