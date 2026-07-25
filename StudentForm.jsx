function StudentForm(props) {
  const { useState } = React;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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
          setMessageType("ok");
          setMessage("Your registration request has been submitted successfully.");
          setFirstName("");
          setLastName("");
          setEmail("");
          setProgram("");
          if (props.onRegistered) {
            props.onRegistered();
          }
        } else {
          setMessageType("bad");
          setMessage("Registration failed. Please review your details and try again.");
        }
      })
      .catch(function () {
        setMessageType("bad");
        setMessage("Could not reach the server. Please try again later.");
      });
  }

  function field(id, label, value, setValue, hint) {
    return (
      <div className="field-row">
        <label htmlFor={id}>
          {label} <span className="req" data-hint="Required field">*</span>
        </label>
        <div className="field-input">
          <span className="input-wrap" data-hint={hint}>
            <input
              id={id}
              type="text"
              value={value}
              onChange={function (e) { setValue(e.target.value); }}
            />
          </span>
          {errors[id] && <span className="error">{errors[id]}</span>}
        </div>
      </div>
    );
  }

  return (
    <section className="card">
      <div className="card-head">Student Registration</div>

      <div className="card-body">
        <p className="instructions">
          Complete all required fields marked with <span className="req">*</span> and
          select <strong>Register</strong> to submit.
        </p>

        {message && (
          <div className={messageType === "ok" ? "notice ok" : "notice bad"}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {field("firstName", "First Name", firstName, setFirstName,
            "Your given name as it appears on your ID, e.g. Mary")}
          {field("lastName", "Last Name", lastName, setLastName,
            "Your family name, e.g. Karim")}
          {field("email", "Email Address", email, setEmail,
            "Must contain @, e.g. mary.karim@college.edu")}
          {field("program", "Program of Study", program, setProgram,
            "Full program name, e.g. Computer Science")}

          <div className="form-actions">
            <button type="submit" className="quest-btn">Register</button>
          </div>
        </form>
      </div>
    </section>
  );
}
