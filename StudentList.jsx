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

  if (status === "loading") {
    return (
      <section className="card">
        <h2>Registered Students</h2>
        <p>Loading students...</p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="card">
        <h2>Registered Students</h2>
        <p className="error">Could not load the student list.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Registered Students</h2>

      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
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
    </section>
  );
}
