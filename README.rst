.. figure:: https://raw.github.com/wq/wq/master/images/128/wq.png
   :align: center
   :target: https://wq.io
   :alt: wq

`wq <https://wq.io>`_ is a modular framework for citizen science field data
collection via offline-capable mobile web apps.

Getting Started
---------------

::

    python3 -m venv venv
    . venv/bin/activate
    pip install wq
    wq start -d myproject.example.com myproject

See `the documentation <https://wq.io/docs>`_ for more information.
See https://github.com/wq/wq/issues to report any issues.

Features
--------

wq is made up of the following submodules, which are maintained as
separate packages.


.. csv-table::
  :header: "Module", "PyPI", "Github", "Description"
  :widths: 100, 100, 100, 500

  |wq_app|, `wq.app <https://pypi.python.org/pypi/wq.app>`_, `wq/wq.app <https://github.com/wq/wq.app>`_, "A JavaScript+Python library for building robust offline-capable HTML5 data entry apps."
  |wq_core|, `wq.core <https://pypi.python.org/pypi/wq.core>`_, `wq/wq.core <https://github.com/wq/wq.core>`_, "wq command line interface."
  |wq_db|, `wq.db <https://pypi.python.org/pypi/wq.db>`_, `wq/wq.db <https://github.com/wq/wq.db>`_, "A collection of Django database models and REST framework to support design patterns common to data collection systems."
  |wq_io|, `wq.io <https://pypi.python.org/pypi/wq.io>`_, `wq/wq.io <https://github.com/wq/wq.io>`_, "A Python interoperability library for consuming and generating data resources in various formats." 
  |wq_start|, `wq.start <https://pypi.python.org/pypi/wq.start>`_, `wq/wq.start <https://github.com/wq/wq.start>`_, "Project template and scaffolding tools."

.. |wq_app| image:: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.app.png     
  :target: https://wq.io/wq.app
.. |wq_core| image:: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.core.png     
  :target: https://wq.io/wq.core
.. |wq_db| image:: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.db.png     
  :target: https://wq.io/wq.db
.. |wq_io| image:: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.io.png     
  :target: https://wq.io/wq.io
.. |wq_start| image:: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.start.png     
  :target: https://wq.io/wq.start
