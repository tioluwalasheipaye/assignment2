1. How did React manage the form data?

Each field had its own useState hook in StudentForm - firstName, lastName, email, and program. Every input's value was bound to its state variable and its onChange handler wrote back to that state, so React state rather than the DOM held the current form data.

2. Why are controlled components useful?

Because state is the single source of truth, the values are available at any moment without querying the DOM. That made validation, inline error messages, and clearing the form after a successful submit straightforward - resetting the fields is simply setting the state back to empty strings.

3. How did PHP process the submitted information?

register.php read the raw request body using file_get_contents("php://input") and decoded it with json_decode. It trimmed each field, re-checked that none were empty and that the email contained an @, inserted the record, and returned a JSON status to the browser.

4. How did PHP connect to MySQL?

Through PDO. A DSN string specified the host, database, and character set, and the error mode was set to ERRMODE_EXCEPTION so failures threw catchable exceptions. The INSERT used a prepared statement with named placeholders, keeping user input separate from the SQL and preventing injection.

5. What challenges did you encounter?

The directory would not refresh after a registration until we passed a counter into StudentList's useEffect dependency array. We also stopped returning raw PDOException messages to the browser once we realised they exposed database details.
