# Django settings for example project.

import os
gettext = lambda s: s
PROJECT_PATH = os.path.abspath(os.path.dirname(__file__))

DEBUG = True

#STATIC_ROOT = os.path.join(PROJECT_PATH, 'static'),
STATIC_ROOT = ''

STATIC_URL = '/static/'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)


# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.app_directories.Loader',
)

ROOT_URLCONF = 'example.urls'

INSTALLED_APPS = (
    'example.browserid',
    'django.contrib.staticfiles',
)
