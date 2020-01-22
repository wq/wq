import os
from setuptools import setup

LONG_DESCRIPTION = """
A modular framework for citizen science field data collection via offline-capable mobile web apps.
"""


def readme():
    try:
        readme = open('README.md')
    except IOError:
        return LONG_DESCRIPTION
    else:
        return readme.read()


setup(
    name='wq',
    use_scm_version=True,
    author='S. Andrew Sheppard',
    author_email='andrew@wq.io',
    url='https://wq.io/',
    license='MIT',
    description=LONG_DESCRIPTION.strip(),
    long_description=readme(),
    long_description_content_type='text/markdown',
    install_requires=[
        'wq.app>=1.2.0,<1.3.0',
        'wq.core>=1.2.0,<1.3.0',
        'wq.db>=1.2.0,<1.3.0',
        'wq.start>=1.2.0,<1.3.0',
    ],
    python_requires='>=3',
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
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3 :: Only',
        'Framework :: Django',
        'Framework :: Django :: 1.11',
        'Framework :: Django :: 2.0',
        'Framework :: Django :: 2.1',
        'Framework :: Django :: 2.2',
        'Framework :: Django :: 3.0',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Topic :: Text Processing :: Markup :: HTML',
        'Topic :: Scientific/Engineering :: GIS',
        'Topic :: Software Development :: Build Tools',
        'Topic :: Software Development :: Pre-processors',
        'Topic :: Database :: Database Engines/Servers',
        'Topic :: Text Processing :: Markup :: XML',
    ],
    setup_requires=[
        'setuptools_scm',
    ],
)
