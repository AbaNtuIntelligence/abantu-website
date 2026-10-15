# Contact email setup — AbaNtu Intelligence

## What changed

The Contact page submits to the existing Django endpoint, `POST /api/v1/enquiries/`. The backend validates and stores the enquiry before attempting a notification through HMailPlus.

- From: `AbaNtu Intelligence <info@abantu-intelligence.co.za>`
- To: `info@abantu-intelligence.co.za`
- Reply-To: the visitor's validated email address
- SMTP: `smtp.hmailplus.com`, port `587`, STARTTLS, authenticated with the mailbox password

The visitor is never used as the From address, and cannot choose the recipient. No automatic reply is sent to an unverified visitor address. This keeps the contact endpoint from becoming an email relay.

Contact, footer and About-page email links share `frontend/src/data/site.js`.

## Apply this source patch

Extract the patch ZIP. Copy its `apps`, `config`, `frontend` and `docs` folders, plus `.env.example` and `render.yaml`, into the root of your existing `abantu-website` checkout and merge/replace the matching files. Keep your real `.env` private; this ZIP does not contain one. No project images or unrelated source files are included.

From your repository root in PowerShell:

```powershell
git add apps/enquiries config/settings.py frontend/src/data/site.js frontend/src/pages/About.jsx frontend/src/pages/Contact.jsx frontend/src/services/api.js frontend/src/styles/components.css frontend/render.yaml frontend/.env.example frontend/.gitignore .env.example render.yaml docs/CONTACT-EMAIL.md
git commit -m "Connect contact enquiries to HMailPlus email"
git push origin main
```

Use your actual deployment branch if it is not `main`. Deploy/configure the Django backend before enabling the frontend API connection. Existing deployments will not change merely by downloading the ZIP.

## Requirements before live email can work

1. The actual mailbox must exist: HMailPlus must show **Accounts 1/1** and list `info@abantu-intelligence.co.za`. An active subscription with Accounts 0/1 has no mailbox yet.
2. Confirm you can sign into https://webmail.hmailplus.com with that mailbox password.
3. Use an SMTP-capable backend. **Render Free web services block ports 25, 465 and 587.** HMailPlus SMTP therefore needs a paid Render backend, or a backend hosted elsewhere with outbound SMTP allowed. The React static website can remain on its existing plan.
4. Keep a persistent database (the existing Render PostgreSQL configuration is suitable). Do not rely on an ephemeral SQLite file for saved enquiries.

If you want to retain a free Render backend, a separately configured HTTPS transactional email provider is an alternative. That is not implemented or provisioned in this patch and would need sender-domain verification. Do not change the HMailPlus MX records to deploy this code.

## Backend settings — enter in Render Environment

Set these on the **Django backend service**, never in the frontend service:

| Variable | Value |
|---|---|
| `EMAIL_BACKEND` | `django.core.mail.backends.smtp.EmailBackend` |
| `EMAIL_HOST` | `smtp.hmailplus.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USE_TLS` | `True` |
| `EMAIL_USE_SSL` | `False` |
| `EMAIL_HOST_USER` | `info@abantu-intelligence.co.za` |
| `EMAIL_HOST_PASSWORD` | Enter the actual mailbox password privately in Render |
| `DEFAULT_FROM_EMAIL` | `AbaNtu Intelligence <info@abantu-intelligence.co.za>` |
| `CONTACT_RECIPIENT_EMAIL` | `info@abantu-intelligence.co.za` |
| `EMAIL_TIMEOUT` | `15` |
| `DEBUG` | `False` |
| `CORS_ALLOWED_ORIGINS` | `https://abantu-intelligence.co.za,https://www.abantu-intelligence.co.za,https://abantu-website-2mpf.onrender.com` |

Also retain your existing `DATABASE_URL`, `SECRET_KEY` and `ALLOWED_HOSTS`. Include the actual frontend preview URL if it differs. CORS origins have no trailing slash. The password must never appear in Git, JavaScript, `VITE_*` variables, or a screenshot shared publicly.

The defaults already select the correct mailbox and servers; the mailbox password is intentionally blank in the source.

## Deploy the backend first

The existing build script runs database migrations. Use backend Start Command `gunicorn config.wsgi:application --timeout 60` (also set in the blueprint) so the SMTP attempt can return its recorded status before the web worker is killed. If deploying manually:

```sh
python manage.py migrate
python manage.py check
```

New delivery-status fields are added without deleting existing enquiries. Historical enquiries are marked `legacy` so installing the feature cannot trigger emails for all old records.

From the backend service shell, check SMTP connectivity without sending an email:

```sh
python manage.py check_contact_email
```

This validates DNS/network, encryption and login. A successful check is not proof of inbox delivery.

## Frontend settings

Set this on the **frontend static-site service** and rebuild:

```text
VITE_API_BASE_URL=https://YOUR-ACTUAL-DJANGO-BACKEND.onrender.com/api/v1
```

Copy the backend's actual HTTPS URL from its Render dashboard. The previously used `https://abantu-website.onrender.com/api/v1/health/` returned HTTP 503 during this work; confirm the backend is healthy rather than assuming that old URL is ready. Do not use the static website URL unless it has a correctly configured API reverse proxy. The backend URL ending in `/api/v1/health/` should return JSON identifying the AbaNtu API.

Use the existing frontend build command and publish directory. A standard setup with Root Directory `frontend` uses Build Command `npm ci && npm run build` and Publish Directory `dist`. Keep existing working settings if they already build that folder. Node 24 is supported by the repository's Vite version; the included frontend blueprint is updated from its outdated Node 18 setting.

The contact form deliberately displays an error if no production API URL is supplied or if a misrouted API request returns an HTML page. It will not show a false success.

## Delivery behaviour and recovery

- Success means the enquiry is saved. HTTP 201 additionally means the configured email backend accepted the notification; it does not guarantee inbox placement. HTTP 202 means the enquiry is saved but email is not confirmed.
- Form input remains after a request error. A retry of the unchanged submission uses the same ID and does not generate a second notification.
- Enquiries are visible only to administrators through the API and Django admin. The public response contains only a receipt message and reference.
- Staff can review email status, attempts, sent time and a non-sensitive error category in Django admin.
- SMTP authentication/configuration failures are marked `failed`. After fixing the issue, run:

```sh
python manage.py retry_enquiry_emails --limit 25
```

This is an operator-run command, not an automatically installed queue or cron job. It retries pending/failed entries and skips accepted, historical and uncertain entries. A command exit with a printed `failed` status means delivery still needs attention.

- A timeout or SMTP disconnect may happen after the provider accepted the message. Such entries are marked `uncertain` and are not retried automatically. Check the mailbox and provider logs before an operator decides to resend. A process killed during sending can leave `sending` status; review it similarly. This avoids blindly duplicating potentially delivered messages.
- No attachment handling is added to the public form.

## Abuse controls and limits

The form has field-length limits, header-injection checks, a honeypot, a single permitted server-side recipient, a browser-Origin allowlist, and per-address/IP throttling. CORS is not authentication and does not block scripted clients.

Defaults: 5 requests/minute and 20/hour per identified client, plus 5/hour per submitted email. The default Django local-memory cache provides basic per-process throttling; it resets on restart and is not a distributed abuse-control system. Configure a shared cache and CAPTCHA/WAF if traffic warrants it.

`CONTACT_NUM_PROXIES=0` uses `REMOTE_ADDR` and avoids trusting unverified forwarded headers. Behind a reverse proxy this can group visitors under the proxy address. Configure the actual trusted proxy-hop count only after verifying how your deployment rewrites X-Forwarded-For; do not blindly trust arbitrary client headers.

## Verification performed

- 14 Django tests cover SMTP sender/recipient/reply-to, storage on failure, ambiguous timeout handling, retry behaviour, idempotency, privacy, validation, origin checks, throttling and missing credentials.
- Django model/migration consistency check passed.
- Vite production build passed.
- Browser form checks passed for HTTP failure feedback, preserved form input, same-key retry, confirmed success and mobile layout. No JavaScript page errors or mobile horizontal overflow were observed. These checks use intercepted responses, not real email sends.

Live SMTP login and end-to-end mailbox delivery still need the actual backend credentials, SMTP-capable hosting and a created mailbox. No live message was sent during implementation.

## References

- HOSTAFRICA HMailPlus settings: https://help.hostafrica.com/article/how-to-set-up-your-hmail-emails-in-outlook-classic
- Render Free SMTP limitation: https://render.com/docs/free
- Django email API: https://docs.djangoproject.com/en/6.0/topics/email/
