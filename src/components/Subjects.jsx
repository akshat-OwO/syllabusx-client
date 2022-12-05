const Subjects = (props) => {
    return (
      <div className="subjects hidden">
      <div className="sub-header">
        <h1>Subjects</h1>
        <p>Better to complete it now then later!</p>
      </div>
      <div className="sub-wrapper">
        {
          props.data.length && (
            props.data.map(d => (
              <div className="sub-title" key={d._id}>{d.subject}</div>
            ))
          )
        }
      </div>
    </div>
    );
}
 
export default Subjects;