function StudentList(props) {
  const { useState, useEffect } = React;

  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(function () {
    setStatus("loading");

    fetch("students.php")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setStudents(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch(function () {
        setStatus("error");
      });
  }, [props.refresh]);

  return (
    <section className="card">
      <div className="card-head">Student Directory</div>

      <div className="card-body">
        {status === "loading" && <p className="instructions">Loading students...</p>}

        {status === "error" && (
          <div className="notice bad">Could not load the student list.</div>
        )}

        {status === "ready" && students.length === 0 && (
          <p className="instructions">No students registered yet.</p>
        )}

        {status === "ready" && students.length > 0 && (
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Program</th>
              </tr>
            </thead>
            <tbody>
              {students.map(function (student) {
                return (
                  <tr key={student.studentID}>
                    <td>{student.studentID}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.program}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
