# Student Registration System

Register students and view the list. React on the front, PHP and MySQL behind it.

## Setup

You need PHP 8 and MySQL. Load the database:

```sh
mysql -u root < database.sql
```

Then run the app from the project folder:

```sh
php -S localhost:8000
```

Open <http://localhost:8000>.

## Notes

The DB login is at the top of `register.php` and `students.php` (`root`, no
password). Change it if yours is different.

If every submit fails, check that `pdo_mysql` is enabled in your `php.ini`.
Nothing else will look wrong, so it's easy to miss.
