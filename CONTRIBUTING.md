# Contributing Guidelines

Thanks for contributing to the wq framework!  Here are some guidelines to help you get started.

## Questions

Questions and ideas can be submitted to the main [wq discussion board](https://github.com/wq/wq/discussions).

## Bug Reports

wq is a highly modular framework and the code is split across several repositories.  If you are unsure where to report an issue, feel free to use the top-level [wq repository](https://github.com/wq/wq/issues).  Otherwise, enter your issue on the repository that most closely matches the component you are using.

 * [wq](https://github.com/wq/wq/issues): General API design & documentation
 * [wq.app](https://github.com/wq/wq.app/issues): JavaScript client & build tool
 * [wq.build](https://github.com/wq/wq.build/issues): CLI & Project build tools
 * [wq.create](https://github.com/wq/wq.create/issues): `wq create` command & project templates
 * [wq.db](https://github.com/wq/wq.db/issues): Web server & REST API (Django REST Framework)
 * [xlsconv](https://github.com/wq/xlsform-converter/issues): XLSForm converter

Don't worry about getting the repository exactly right - many issues span multiple repositories and we can always reference the fix back to the original ticket.

## Pull Requests

Pull requests are very welcome and will be reviewed and merged as time allows.  To speed up reviews, try to include the following whenever possible:
 * Reference the issue that the PR fixes (e.g. [#22](https://github.com/wq/wq/issues/22) or [wq/wq#22](https://github.com/wq/wq/issues/22) if in a different repository).
 * Failing test case fixed by the PR
 * If the PR provides new functionality, a separate PR updating the [wq documentation](https://github.com/wq/wq/tree/main/docs).
 * Ensure the PR passes lint and unit tests.  This happens automatically, but you can also run these locally with the following commands:
 
```bash 
python -m unittest discover -s tests -t . # run the test suite
flake8 # run code style checking
```

If you would like help implementing any part of your PR, feel free to enable write access and we'll take a look as time allows.
 
## Development & Testing

Small changes and documentation fixes can usually be done using Github's online file editors.  For larger changes, we recommend the following workflow.

Because wq is split across several repositories, we recommend installing the `wq` package, starting a test project, and then cloning the specific module you want to update.  For example, to work on [wq.db](https://github.com/wq/wq.db), clone it to your account and then do something like this:

### Initial Setup
```bash
# Initialize workspace & test project
WORKSPACE=~/devel/
mkdir $WORKSPACE && cd $WORKSPACE
python3 -m venv venv
. venv/bin/activate
pip install --upgrade pip
pip install wq
wq create -d test.wq.io testproject .

# Clone wq.db from fork
git clone git@github.com:[my-username]/wq.db.git
cd wq.db
git checkout -b my-wqdb-branch
```

### Ongoing Development
```bash
cd $WORKSPACE/wq.db
vim wq/db/rest/some_file.py # (make changes to wq.db)
python -m unittest discover -s tests -t . # run the test suite
flake8 # run code style checking

pip install --upgrade .  # overwrites PyPI wq.db with local version
cd $WORKSPACE/
./deploy.sh 0.0.$RANDOM
```
