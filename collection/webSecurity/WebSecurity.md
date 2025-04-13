# 🔐 How to Secure Single Page Applications (SPAs)

Single Page Applications (SPAs) offer a seamless user experience but also present unique security challenges. This guide covers essential security best practices for SPAs, including frontend and backend techniques.

---

## 🔒 1. Use HTTPS for All Communication

All communication between client and server should be encrypted.

**Why:** Protects against man-in-the-middle (MITM) attacks and data leakage.

```bash
# Enforce HTTPS using a reverse proxy (e.g., Nginx)
return 301 https://$host$request_uri;
```

---

## 🔐 2. Authentication and Authorization

### ✅ Use Token-Based Authentication (JWT or OAuth2)

-   Store JWT **only in memory** (not in localStorage or sessionStorage) when possible.
-   Use **HTTP-only, Secure cookies** for storing refresh tokens.

```js
// Setting secure, httpOnly cookie from server
res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
});
```

### ✅ Protect Routes with Role-Based Access Control (RBAC)

```js
// Frontend route guard (React example)
<Route
    path="/admin"
    element={user?.role === 'admin' ? <Admin /> : <Navigate to="/login" />}
/>
```

---

## 🧼 3. Sanitize User Inputs

Prevent Cross-Site Scripting (XSS) attacks by sanitizing user-generated content.

### Use libraries like:

-   `DOMPurify`
-   `sanitize-html`

```js
import DOMPurify from 'dompurify';
const safeHtml = DOMPurify.sanitize(userComment);
```

---

## 📜 4. Content Security Policy (CSP)

CSP helps prevent XSS by restricting the sources from which scripts can be loaded.

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
```

Set via meta tag or HTTP header.

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
```

---

## 🛡️ 5. Cross-Site Request Forgery (CSRF)

When using cookies for auth, protect endpoints from CSRF attacks.

-   Use anti-CSRF tokens (`csurf` middleware on backend).
-   Set `SameSite=Strict` or `Lax` on cookies.

```js
res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
});
```

---

## 🧪 6. Validate All API Requests on Server

Never trust client-side logic. Validate all data on the server side.

```js
const { body, validationResult } = require('express-validator');

app.post('/api/profile', body('email').isEmail(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    // continue...
});
```

---

## 🚫 7. Avoid Local Storage for Sensitive Tokens

**Why:** Local storage is accessible via JavaScript and vulnerable to XSS.

Instead, use **HTTP-only cookies** or **in-memory storage** for access tokens.

---

## 🧱 8. Rate Limiting & Throttling (Backend)

Use `express-rate-limit` or similar tools to prevent brute-force attacks.

```js
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
```

---

## 🕵️‍♂️ 9. Disable Dangerous Features

-   Avoid `eval`, `new Function`, or dynamic imports with untrusted input.
-   Disable browser features not in use via permissions policy.

```http
Permissions-Policy: geolocation=(), microphone=()
```

---

## 📦 10. Secure Dependencies

Regularly audit your frontend dependencies:

```bash
npm audit fix
```

Use tools like:

-   [Snyk](https://snyk.io/)
-   [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

## 📉 11. Limit Client-Side Exposure

-   Don’t expose secret keys, DB credentials, or internal logic in your frontend.
-   Use `.env` and `.env.production` files to safely inject config at build time.

```js
REACT_APP_API_BASE_URL=https://api.yourdomain.com
```

---

## 🔎 12. Logging and Monitoring

Use tools like:

-   Sentry (frontend error tracking)
-   Winston, Morgan (backend logging)
-   Audit logs for critical operations (admin access, auth, deletion)

---

## 🔄 13. Implement Refresh Token Rotation

-   Short-lived access tokens (5-15 minutes)
-   Long-lived refresh tokens stored in secure cookies
-   Rotate refresh token on every use

---

## ✅ 14. Protect Build Artifacts

-   Don’t leave source maps (`*.map` files) in production.
-   Use code obfuscation/minification.

```json
// In React (vite.config.js or CRA)
build: {
  sourcemap: false
}
```

---

## 🧰 Optional: Use Web Application Firewall (WAF)

Services like Cloudflare, AWS WAF, or Azure Front Door can:

-   Block common attacks
-   Rate limit malicious requests
-   Mitigate bots and crawlers

---
