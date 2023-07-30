import { useLoaderData } from "react-router-dom";

export async function subjectsLoader({ params }) {
  const response = await fetch(`https://syllabusx-web-server.azurewebsites.net/${params.semester}/${params.branch}`);
  const data = await response.json();
  console.log("🚀 ~ subjectLoader ~ data:", data)

  return { data }
}

const Subjects = () => {
  const { data } = useLoaderData();

  const handleShowSubject = (e) => {
    data.map(d => {
      if (e.target.textContent === d.subject) {
        setShowcase(d);
        setSearching(false);
        setSubjectShow(true);
      }
    });
  }

    return (
      <div>
        {data ? (<div className="subjects">
        <div className="sub-header">
          <h1>Subjects</h1>
        </div>
        <div className="sub-wrapper">
          {
        
              data.map((d, index) => (
                <div className="sub-title" tabIndex={index + 2} key={d._id} onClick={handleShowSubject}>{d.subject}</div>
              ))
          }
        </div>
            </div>): <div>loading...</div>}
      </div>
    );
}
 
export default Subjects;
