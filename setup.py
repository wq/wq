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


setup(
    name='wq',
    version='0.8.0',
    author='S. Andrew Sheppard',
    author_email='andrew@wq.io',
    url='http://wq.io/',
    license='MIT',
    description=LONG_DESCRIPTION.strip(),
    long_description=long_description(),
    install_requires=[
        'wq.app>=0.8.0,<0.9',
        'wq.core>=0.8.0,<0.9',
        'wq.db>=0.8.1,<0.9',
        'wq.io>=0.8.0,<0.9',
        'wq.start>=0.8.1,<0.9',
    ],
    packages=['wq'],
    namespace_packages=['wq'],
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Environment :: Web Environment',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
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
