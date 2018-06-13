import os
from setuptools import setup

LONG_DESCRIPTION = """
A modular framework for citizen science field data collection via offline-capable mobile web apps.
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
    version='1.1.0',
    author='S. Andrew Sheppard',
    author_email='andrew@wq.io',
    url='https://wq.io/',
    license='MIT',
    description=LONG_DESCRIPTION.strip(),
    long_description=long_description(),
    install_requires=[
        'wq.app>=1.1.0,<1.2.0',
        'wq.core>=1.1.0,<1.2.0',
        'wq.db>=1.1.0,<1.2.0',
        'wq.io>=1.1.0,<1.2.0',
        'wq.start>=1.1.0,<1.2.0',
    ],
    packages=['wq'],
    namespace_packages=['wq'],
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Environment :: Web Environment',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Framework :: Django',
        'Framework :: Django :: 1.11',
        'Framework :: Django :: 2.0',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Topic :: Text Processing :: Markup :: HTML',
        'Topic :: Scientific/Engineering :: GIS',
        'Topic :: Software Development :: Build Tools',
        'Topic :: Software Development :: Pre-processors',
        'Topic :: Database :: Database Engines/Servers',
        'Topic :: Text Processing :: Markup :: XML',
    ]
)
