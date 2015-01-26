---
order: 7
---

Recommended Settings
========

[wq.db.rest.settings]

Below are the recommended settings for wq.db projects.  These can be utilized by importing them from `wq.db.rest.settings`.
```python
# Django settings
TEMPLATE_LOADERS = (
    'wq.db.rest.template.Loader',
    'django.template.loaders.app_directories.Loader',
)
TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'wq.db.rest.auth.context_processors.is_authenticated',
    'wq.db.rest.auth.context_processors.social_auth',
    'wq.db.rest.auth.context_processors.csrftoken',
    'wq.db.rest.context_processors.version',
)
SESSION_COOKIE_HTTPONLY = False

# Django Rest Framework settings
REST_FRAMEWORK = {
    'PAGINATE_BY': 50,
    'PAGINATE_BY_PARAM': 'limit',

    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.TemplateHTMLRenderer',
        'wq.db.rest.renderers.JSONRenderer',
        'wq.db.rest.renderers.AMDRenderer',
        'wq.db.rest.renderers.GeoJSONRenderer',
    ),

    'DEFAULT_MODEL_SERIALIZER_CLASS':
    'wq.db.rest.serializers.ModelSerializer',

    'DEFAULT_PAGINATION_SERIALIZER_CLASS':
    'wq.db.rest.serializers.PaginationSerializer',

    'DEFAULT_PERMISSION_CLASSES': (
        'wq.db.rest.permissions.ModelPermissions',
    ),

    'FILTER_BACKEND': 'wq.db.rest.filters.FilterBackend'
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

[wq.db.rest.settings]: https://github.com/wq/wq.db/blob/master/rest/settings.py
