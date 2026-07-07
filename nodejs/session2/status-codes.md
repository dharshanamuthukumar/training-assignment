# HTTP Status Codes

## 200 OK

Meaning:
The request was successful.

Real Scenario:
A user requests `/users` and the server successfully returns the list of users.

---

## 201 Created

Meaning:
A new resource has been successfully created.

Real Scenario:
A user registers a new account using a POST request and the server creates the user record.

---

## 400 Bad Request

Meaning:
The server cannot process the request because the client sent invalid data.

Real Scenario:
A user submits a registration form without providing a required email field.

---

## 401 Unauthorized

Meaning:
Authentication is required or the provided credentials are invalid.

Real Scenario:
A user tries to access a profile page without logging in.

---

## 403 Forbidden

Meaning:
The server understands the request but refuses to allow access.

Real Scenario:
A normal user tries to access an admin-only dashboard.

---

## 404 Not Found

Meaning:
The requested resource does not exist.

Real Scenario:
A user visits `/users/9999` but no user with that ID exists.

---

## 500 Internal Server Error

Meaning:
The server encountered an unexpected problem.

Real Scenario:
A database connection fails while processing a user request.
