Student Registration System

A small web app for registering students and viewing the ones already registered. React on the front, PHP and MySQL on the back.

Built by Duc, Clinton, Tioluwa, Michael, and Nirmaan.

1. Work allocation

Duc: 
Set up the project structure and the shared layout components. 
Clinton:
Built the registration form and the client-side validation. 
Tioluwa: 
Wrote the PHP endpoints and the database schema. 
Michael: 
Built the directory view and the fetching that keeps it in sync after a registration. 
Nirmaan:
Did the styling and tested both pages together.
Everyone took part in planning and debugging.

What you need
PHP 8 with the pdo_mysql extension turned on
MySQL (XAMPP works fine)

If you get {"status":"error"} on every submit, check pdo_mysql first. Run:

php -r "echo implode(',', PDO::getAvailableDrivers());"

If that prints nothing, PHP can't talk to MySQL and you need to enable the extension in your php.ini. Everything else will look fine, which makes it annoying to track down.

Setup

Start MySQL, then load the schema:

mysql -u root < database.sql

That creates the college database, the students table, and drops in two sample rows.

The database login is hardcoded at the top of register.php and students.php (root, no password). Change it there if yours is different.

Running it

From the project folder:

php -S localhost:8000

Then open http://localhost:8000.

You can also drop the folder in htdocs and use Apache instead. Either way works, the paths are all relative.

The registration form is the page you land on. The Student Directory tab is hidden until you click the small Admin button in the top-right corner, which opens a panel for jumping to either page or viewing both side by side.

Files
File	What it does
index.html	Page shell, loads React and Babel from a CDN
App.jsx	Switches between the form and the list
Header.jsx / Footer.jsx	Nav and footer
StudentForm.jsx	Registration form, posts to register.php
StudentList.jsx	Table of students, reads from students.php
register.php	Validates and inserts a student
students.php	Returns all students as JSON
database.sql	Schema and sample data
style.css	Styles

dev-temp.jsx and dev-temp.php are dev helpers. dev-temp.php hashes the file timestamps so the page can auto-reload when you save something. It only answers requests from localhost. Neither is needed for the app to work.

Notes

Babel compiles the JSX in the browser, so there's no build step. That's handy for development but slow, and you wouldn't ship it that way.

Both PHP files swallow the real error message and just return error. Fine for an assignment, but it does make debugging harder than it should be.

There's no UNIQUE constraint on email and no duplicate check, so the same address can register more than once. Validation on both sides only checks for an @, which lets through things like a@b.
