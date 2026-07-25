function StudentForm(props) {
  const { useState } = React;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function validate() {
    const found = {};

    if (firstName.trim() === "") {
      found.firstName = "First name is required";
    }
    if (lastName.trim() === "") {
      found.lastName = "Last name is required";
    }
    if (email.trim() === "") {
      found.email = "Email is required";
    } else if (email.indexOf("@") === -1) {
      found.email = "Email must contain @";
    }
    if (program.trim() === "") {
      found.program = "Program is required";
    }

    return found;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      return;
    }

    fetch("register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        program: program.trim()
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status === "success") {
          setMessage("Student registered successfully!");
          setFirstName("");
          setLastName("");
          setEmail("");
          setProgram("");
          if (props.onRegistered) {
            props.onRegistered();
          }
        } else {
          setMessage("Registration failed. Please check your details.");
        }
      })
      .catch(function () {
        setMessage("Could not reach the server.");
      });
  }

  return (
    <section className="card">
      <h2>Register a Student</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={function (e) { setFirstName(e.target.value); }}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={function (e) { setLastName(e.target.value); }}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={function (e) { setEmail(e.target.value); }}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="program">Program</label>
          <input
            id="program"
            type="text"
            value={program}
            onChange={function (e) { setProgram(e.target.value); }}
          />
          {errors.program && <span className="error">{errors.program}</span>}
        </div>

        <button type="submit">Register</button>
      </form>

      {message && <p className="message">{message}</p>}
    </section>
  );
}
