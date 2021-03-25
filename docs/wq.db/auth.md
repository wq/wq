---
order: 5
---

Authentication
========

[wq.db.rest.auth]

[wq.db]'s [REST API] provides a simple authentication service powered by Django's [auth module].  When `wq.db.rest.auth` is included in your `INSTALLED_APPS`, the following URLs will be registered with the [router].

url | purpose
----|--------
`/login` | Displays a form for entering username and password.  Note that it is up to you to provide the required template, `login.html`.
`/login.json` | Used by [@wq/app] to submit and/or verify login information.  A successful login will return the user information as well as a user-specific [wq configuration object].
`/logout` | Logs out the user and displays a success message.  Note that it is up to you to provide the required template, `logout.html`.
`/logout.json` | Used by [@wq/app] to log out the user via AJAX.

[wq.db.rest.auth]: https://github.com/wq/wq.db/blob/main/rest/auth/
[wq.db]: ./index.md
[REST API]: ./rest.md
[auth module]: https://docs.djangoproject.com/en/1.7/topics/auth/
[router]: ./router.md
[@wq/app]: ../@wq/app.md
[wq configuration object]: ../wq-configuration-object.md
