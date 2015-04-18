---
order: 7
---

Recommended Settings
========

[wq.db.default_settings]

Below are the recommended settings for projects using wq.db 0.8.0 and later.  These can be utilized by importing them from `wq.db.default_settings`.
```python
# Django settings
TEMPLATE_LOADERS = (
    'wq.db.rest.template.Loader',
    'django.template.loaders.app_directories.Loader',
)
TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.csrf',  # Django 1.7/1.8
    'django.contrib.auth.context_processors.auth',
    'wq.db.rest.auth.context_processors.is_authenticated',
    'wq.db.rest.auth.context_processors.social_auth',
    'wq.db.rest.context_processors.version',
    'wq.db.rest.context_processors.pages_info',
    'wq.db.rest.context_processors.wq_config',
)
SESSION_COOKIE_HTTPONLY = False

# Django Rest Framework settings
REST_FRAMEWORK = {

    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.TemplateHTMLRenderer',
        'wq.db.rest.renderers.JSONRenderer',
        'wq.db.rest.renderers.GeoJSONRenderer',
    ),

    'PAGE_SIZE': 50,
    'DEFAULT_PAGINATION_CLASS': 'wq.db.rest.pagination.Pagination',

    'DEFAULT_PERMISSION_CLASSES': (
        'wq.db.rest.permissions.ModelPermissions',
    ),

    'DEFAULT_FILTER_BACKENDS': (
        'wq.db.rest.filters.FilterBackend',
    )
}

# Django Social Auth settings
SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    'social.pipeline.user.create_user',
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details',
    'wq.db.rest.auth.pipeline.assign_default_group',
)

# wq.db settings
ANONYMOUS_PERMISSIONS = tuple()
SRID = 4326
DEFAULT_AUTH_GROUP = "Users"
DISAMBIGUATE = True
```

[wq.db.default_settings]: https://github.com/wq/wq.db/blob/master/default_settings.py
