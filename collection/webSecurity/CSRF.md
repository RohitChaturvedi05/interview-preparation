## 🛡️ What is CSRF (Cross-Site Request Forgery)?

**CSRF** is a type of attack where a malicious website causes a user's browser to perform an unwanted action on a trusted site where the user is authenticated. It exploits the fact that browsers automatically include credentials (like cookies) with requests.

---

## 🧠 Example Scenario

### 💡 Imagine:

1. You are logged into your bank at `https://mybank.com`.
2. Your session is maintained via an authentication cookie.
3. You visit a malicious site `evilsite.com`.
4. That site has the following code:

```html
<img src="https://mybank.com/transfer?amount=1000&to=attacker" />
```

When the image loads, your browser automatically includes the authentication cookie, causing the transfer to occur **without your consent**.

---

## 🔥 Key Characteristics

| Feature         | Description                                    |
| --------------- | ---------------------------------------------- |
| Requires login? | Yes — relies on existing authentication        |
| Targets         | State-changing operations (POST, PUT, DELETE)  |
| Steals data?    | No — it abuses permissions, doesn’t steal info |

---

## 🛡️ How to Prevent CSRF

### ✅ 1. Use Anti-CSRF Tokens

-   Backend generates a unique token per session or form.
-   Client includes it in each form or AJAX request.
-   Server verifies it.

```html
<form method="POST" action="/transfer">
    <input type="hidden" name="csrf_token" value="ABC123xyz" />
</form>
```

**Express Example with csurf:**

```js
const csrf = require('csurf');
app.use(csrf({ cookie: true }));

app.get('/form', (req, res) => {
    res.render('form', { csrfToken: req.csrfToken() });
});
```

---

### ✅ 2. Use `SameSite` Cookies

This prevents browsers from sending cookies along with cross-site requests.

```js
res.cookie('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
});
```

-   `Strict` = best protection
-   `Lax` = allows top-level GET requests only
-   `None` = must be `Secure` (HTTPS)

---

### ✅ 3. Check Origin or Referer Headers

Verify requests are coming from your site:

```js
const origin = req.get('Origin');
if (origin !== 'https://myapp.com') {
    return res.status(403).send('Forbidden');
}
```

---

### ✅ 4. Double Submit Cookie Pattern

Set a CSRF token in a cookie, and also send it in a custom header:

**Client:**

```js
document.cookie = 'csrfToken=ABC123';
fetch('/api/transfer', {
    method: 'POST',
    headers: {
        'X-CSRF-Token': 'ABC123',
    },
});
```

**Server:** Compare cookie value with header.

---

## ✅ When is CSRF Less of a Concern?

-   When you don’t use cookies for authentication.
-   SPAs using `Authorization: Bearer <token>` are less vulnerable to CSRF.
-   However, token access must be protected against **XSS**.

---

## 🔍 Summary

| Mitigation           | Protection                             |
| -------------------- | -------------------------------------- |
| CSRF Tokens          | Best for form-based apps using cookies |
| `SameSite` Cookies   | Great first defense                    |
| Origin/Referer Check | Extra verification layer               |
| Double Submit Cookie | Token sent in both cookie and header   |
| Auth Headers         | SPAs with in-memory tokens avoid CSRF  |

---

> ✅ CSRF is about abusing **trust in the user's browser**. Prevent it by **verifying intentions** — use tokens, headers, or explicit auth methods.
