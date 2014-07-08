import os
from setuptools import setup

LONG_DESCRIPTION = """
A modular framework for building custom offline-capable desktop and mobile web apps.
"""


def long_description():
    """Return long description from README.rst if it's present
    because it doesn't get installed."""
    try:
        return open(os.path.join(
            os.path.dirname(__file__), 'README.rst'
        )).read()
    except IOError:
        return LONG_DESCRIPTION


def list_package_data(root):
    """
    Include django-wq-template as package data
    """
    paths = []
    for base, dirs, files in os.walk(os.path.join('wq', root)):
        base = base.replace('wq' + os.sep, '', 1)
        paths.extend([os.path.join(base, name) for name in files])
    return paths

setup(
    name='wq',
    version='0.6.1',
    author='S. Andrew Sheppard',
    author_email='andrew@wq.io',
    url='http://wq.io/',
    license='MIT',
    description=LONG_DESCRIPTION.strip(),
    long_description=long_description(),
    install_requires=[
        'wq.app==0.6.1',
        'wq.db==0.6.1',
        'wq.io==0.5.1',
    ],
    scripts=['wq/bin/wq-start'],
    packages=['wq'],
    namespace_packages=['wq'],
    package_data={'wq': list_package_data('template')},
    exclude_package_data={'wq': ['template/README.md', 'template/.git']},
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 2.7',
        'Framework :: Django',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Topic :: Text Processing :: Markup :: HTML',
        'Topic :: Scientific/Engineering :: GIS',
        'Topic :: Software Development :: Build Tools',
        'Topic :: Software Development :: Pre-processors',
        'Topic :: Database :: Database Engines/Servers',
        'Topic :: Text Processing :: Markup :: XML',
    ]
)
