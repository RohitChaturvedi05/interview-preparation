# HTTP Status Code Reference

A comprehensive list of HTTP status codes, grouped by category, including common use cases for API development.

---

## 🟦 1xx - Informational

| Code | Name                | Description                                      |
| ---- | ------------------- | ------------------------------------------------ |
| 100  | Continue            | Initial request accepted, client should continue |
| 101  | Switching Protocols | Server agrees to switch protocols                |

---

## 🟩 2xx - Success

| Code | Name       | Description                              |
| ---- | ---------- | ---------------------------------------- |
| 200  | OK         | Request successful                       |
| 201  | Created    | Resource created successfully            |
| 202  | Accepted   | Request accepted but not yet processed   |
| 204  | No Content | Request successful, no content to return |

---

## 🟨 3xx - Redirection

| Code | Name              | Description                                   |
| ---- | ----------------- | --------------------------------------------- |
| 301  | Moved Permanently | Resource moved to a new URL permanently       |
| 302  | Found             | Temporary redirection                         |
| 304  | Not Modified      | Cached version of the resource is still valid |

---

## 🟥 4xx - Client Error

| Code | Name                 | Description                                                               |
| ---- | -------------------- | ------------------------------------------------------------------------- |
| 400  | Bad Request          | Malformed request, validation errors                                      |
| 401  | Unauthorized         | No or invalid authentication credentials                                  |
| 403  | Forbidden            | Authenticated, but no permission to access resource                       |
| 404  | Not Found            | Resource not found                                                        |
| 405  | Method Not Allowed   | HTTP method not supported                                                 |
| 409  | Conflict             | Resource conflict, duplicate entry                                        |
| 422  | Unprocessable Entity | Request understood but semantic errors (often used for validation errors) |
| 429  | Too Many Requests    | Rate limit exceeded                                                       |

---

## 🟥 5xx - Server Error

| Code | Name                  | Description                                  |
| ---- | --------------------- | -------------------------------------------- |
| 500  | Internal Server Error | Generic server error                         |
| 501  | Not Implemented       | Server does not recognize the request method |
| 502  | Bad Gateway           | Invalid response from upstream server        |
| 503  | Service Unavailable   | Server is down or overloaded                 |
| 504  | Gateway Timeout       | No response from upstream server in time     |

---

## ✅ Common API Usage Cheat Sheet

| Scenario                     | Code |
| ---------------------------- | ---- |
| GET item successful          | 200  |
| POST new item created        | 201  |
| Invalid input                | 400  |
| Unauthorized (missing token) | 401  |
| Forbidden (no access rights) | 403  |
| Not found                    | 404  |
| Validation error             | 422  |
| Too many login attempts      | 429  |
| Unexpected server error      | 500  |
