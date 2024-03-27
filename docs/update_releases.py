#!/usr/bin/env python3

from urllib.request import urlopen, Request
import re
import json
import time
import pathlib
import os


def main():
    process_all()


def get_cache_path(path):
    CACHE.mkdir(exist_ok=True)
    return CACHE / (re.sub("\W", "-", path) + ".json")


def get_data(path):
    cache = get_cache_path(path)
    try:
        with cache.open() as f:
            data = json.load(f)
    except OSError:
        page = 1
        data = []
        next_data = []

        while page == 1 or next_data:
            if not GITHUB_TOKEN:
                time.sleep(5)
            request = Request(
                f"{API}/{path}?page={page}",
                None,
                {"Authorization": f"Bearer {GITHUB_TOKEN}"} if GITHUB_TOKEN else {},
            )
            next_data = json.load(urlopen(request))
            if isinstance(next_data, dict) and "message" in next_data:
                raise Exception(next_data["message"])

            data += next_data
            page += 1

        with cache.open("w") as f:
            json.dump(data, f)

    return data


def get_repos():
    return [
        repo["name"]
        for repo in get_data("users/wq/repos")
        if repo["name"]
        not in (
            ".github",
            "django-data-wizard",
            "django-rest-pandas",
            "itertable",
            "wq.markdown",
        )
    ]


def update_url(match):
    url = match[0]
    if url.startswith("http:"):
        url = "https:" + url[5:]
    if url.startswith(WQ_PREFIX):
        return update_wq_url(url)
    elif url.startswith(GITHUB_PREFIX):
        return update_github_url(url)
    elif url.startswith(NPM_PREFIX):
        raise Exception(f"Unexpected npm url: {url}")
    else:
        return url


def has_suffix(path):
    if path.endswith(SUFFIX_CHARS):
        return True
    if path.endswith("s") and path[-2] in SUFFIX_CHARS:
        return True
    return False


def clean_suffix(path):
    suffix = ""
    for term in SUFFIX_TERMS:
        if path.endswith(term):
            suffix = term
            path = path.removesuffix(term)

    while has_suffix(path):
        suffix = path[-1] + suffix
        path = path[:-1]
    return path, suffix


def is_new_site(path):
    for prefix in NEW_PATHS:
        if path.startswith(prefix):
            return True
    return False


def update_wq_url(url):
    path, suffix = clean_suffix(url[len(WQ_PREFIX) :])
    if not path:
        return "../index.md" + suffix
    path = path[1:]
    if path.count("/") == 0:
        if path in MODULES:
            return MODULES[path] + suffix
        elif path in NEW_PATHS and not path.endswith("/"):
            return f"../{path}.md{suffix}"
        else:
            if path:
                path += "/"
                if path not in NEW_PATHS:
                    raise Exception(f"Not in new site: {path}")
            return f"../{path}index.md{suffix}"
    elif "docs/" in path:
        if path.count("/") == 2:
            _, doc_version, doc = path.split("/")
        elif path.count("/") == 1:
            _, doc = path.split("/")
        else:
            raise Exception(path + " from " + url)
        if not doc:
            if ")" not in suffix:
                return f"<https://wq.io/>{suffix}"
            else:
                return f"../index.md{suffix}"
        elif doc in DOCS:
            return DOCS[doc] + suffix
        else:
            raise Exception(f"Unknown doc: {doc}")
    elif "releases" in path:
        module, _, version = path.split("/")
        version = version.removeprefix("v")
        return f"./{module}-{version}.md{suffix}"
    elif path in OTHER_WQ_PATHS:
        return OTHER_WQ_PATHS[path] + suffix
    elif is_new_site(path):
        if path.endswith("/"):
            return f"../{path}index.md{suffix}"
        else:
            return f"../{path}.md{suffix}"
    else:
        raise Exception(url)
    return url


def update_github_url(url):
    path, suffix = clean_suffix(url[len(GITHUB_PREFIX) :])
    if not path.count("/") >= 2:
        if path not in MODULES:
            raise Exception(f"Unknown module: {path}")
        return MODULES[path] + suffix

    repo, path, tag = path.split("/", 2)
    repo_name = REPO_NAMES.get(repo, repo)

    if path in ("issues", "pull", "milestones", "compare", "archive", "commit") or (
        path in ("blob", "tree") and (tag in ALLOW_TREE or tag in DEPRECATED_TREE)
    ):
        if repo_name not in get_repos() + [
            "django-rest-pandas",
            "wq-website",
        ]:
            raise Exception(f"Unexpected repo for path: {url}")
        if tag in DEPRECATED_TREE:
            url = url.replace(tag, DEPRECATED_TREE[tag])
        return url

    if "packages" in tag and path in ("blob", "tree"):
        package = tag.split("packages/")[1]
        if package in DEPRECATED_PACKAGES:
            return DEPRECATED_PACKAGES[package] + suffix
        if package in PACKAGES.get(repo_name, {}):
            return f"../@wq/{package}.md{suffix}"
        else:
            raise Exception(f"@wq/{package} not in {repo_name}")

    other_path = OTHER_GITHUB_PATHS.get(f"{path}/{tag}")
    if other_path:
        return other_path + suffix

    if path != "releases":
        raise Exception(f"Unexpected path: {url}")

    if tag.startswith("tag/"):
        tag = tag[4:]

    tag = tag.lstrip("v")

    if not tag:
        raise Exception(f"No release tag specified in {url}")

    if repo_name == "wq.create" and (tag.startswith("0") or tag in ("1.0.0a1",)):
        repo_name = "wq-django-template"

    if repo_name in get_repos():
        return f"./{repo_name}-{tag}.md{suffix}"
    elif repo_name in MODULES:
        base = MODULES[repo_name]
        if base.startswith(GITHUB_PREFIX):
            return f"{GITHUB_PREFIX}{repo_name}{path}/v{tag}"
        elif ".wq.io" in base and (
            base.endswith(repo_name) or base.endswith(repo_name + "/")
        ):
            return base.replace(repo_name + "/", repo_name).replace(
                repo_name, f"releases/{repo_name}-{tag}{suffix}"
            )
        else:
            raise Exception(f"Unexpected base for {repo_name}: {base}")
    else:
        raise Exception(f"Unknown module: {repo_name}")


def update_body(body, repo_name):
    body = body.replace("\r\n", "\n")
    body = re.sub(URL, update_url, body)
    if not body.endswith("\n"):
        body += "\n"
    body = clean_bookmarks(body)
    body = link_issues(body, repo_name)
    body = link_commits(body, repo_name)
    body = link_users(body)
    return body


def clean_bookmark(row):
    if row.startswith("## <a name") and row.endswith("</a>"):
        return "## " + row.split(">")[1].split("<")[0]
    else:
        return row


def clean_bookmarks(body):
    body = body.replace("#user-content-", "#")
    body = "\n".join(clean_bookmark(row) for row in body.split("\n"))
    body = re.sub(MD_BOOKMARK, ".md", body)
    return body


def link_issues(body, repo_name):
    def link_issue(match):
        repo = match[1] or f"wq/{repo_name}"
        issue = match[2]
        return f"[{match[0]}](https://github.com/{repo}/issues/{issue})"

    body = re.sub(ISSUE, link_issue, body)
    return body


def link_commits(body, repo_name):
    def link_commit(match):
        repo = f"wq/{repo_name}"
        commit = match[0]
        alias = f"`{commit[:7]}`"
        if commit in IGNORE_COMMIT_LIKE:
            return commit
        return f"[{alias}](https://github.com/{repo}/commit/{commit})"

    body = re.sub(COMMIT, link_commit, body)
    return body


def link_users(body):
    def link_user(match):
        if match[0] in ("@wq", "@index", "@rest", "@register"):
            return match[0]
        return f"[{match[0]}](https://github.com/{match[1]})"

    body = re.sub(USER, link_user, body)
    return body


def process_all():
    for repo_name in get_repos():
        print(repo_name)
        process_repo(repo_name)


def process_repo(repo_name):
    next_tag = None
    latest_tag = None
    tags = set(
        tag["name"].lstrip("v") for tag in get_data(f"repos/wq/{repo_name}/tags")
    )
    for release in get_data(f"repos/wq/{repo_name}/releases"):
        tag = release["tag_name"].lstrip("v")
        tags.remove(tag)
        release_name = release["name"]
        outfile = OUTDIR / f"{repo_name}-{tag}.md"
        date = release["published_at"].split("T")[0]
        try:
            body = update_body(release["body"], repo_name)
        except Exception as e:
            print("#" * 80)
            print(f"Error while processing {repo_name} {tag}:")
            print(f"    {e}")

            if (
                len(release["body"]) < 1000
                or input("Show content (N/y)? ").lower() == "y"
            ):
                print("Content:")
                print(release["body"].strip())
                print("#" * 80)
                print(f"Edit at https://github.com/wq/{repo_name}/releases/edit/v{tag}")

            if (
                input("Reload releases from GitHub and try again? (N/y)? ").lower()
                == "y"
            ):
                cache = get_cache_path(f"repos/wq/{repo_name}/releases")
                cache.unlink()
                process_repo(repo_name)
                return
            else:
                exit()

        status_tag = ""
        tag_info = ""
        if not latest_tag:
            if "a" in tag or "b" in tag or "rc" in tag:
                if not next_tag:
                    next_tag = True
                    status_tag = "tag: next\ntag_color: secondary\n"
                    tag_info = " NEXT"
            else:
                latest_tag = True
                status_tag = "tag: latest\ntag_color: primary\n"
                tag_info = " LATEST"

        print(f"    {tag}\t{date}{tag_info}")

        content = (
            f"---\nrepo: {repo_name}\ndate: {date}\n{status_tag}---\n\n"
            f"# {release_name}\n\n"
            f"{body}"
        )
        outfile.write_text(content)
    if tags:
        for tag in reversed(sorted(tags)):
            print(f"    {tag}\t(No release notes)")


API = "https://api.github.com"
URL = "http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"
MD_BOOKMARK = ".md#[a-z-_]+"
ISSUE = "([a-zA-Z0-9-]*/?[a-zA-Z0-9-\.]*)#([0-9]+)"
USER = "@([a-zA-Z0-9-]+)"
COMMIT = "[a-f0-9]{7,}"
GITHUB_PREFIX = "https://github.com/wq/"
WQ_PREFIX = "https://wq.io"
NPM_PREFIX = "https://npmjs.com/package/"
CACHE = pathlib.Path(".cache")
OUTDIR = pathlib.Path("releases")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
SUFFIX_TERMS = ("-powered", "-enabled")
SUFFIX_CHARS = tuple("),.:>'*")
IGNORE_COMMIT_LIKE = ("feedbac", "30de8da907d240a0bccd5ad3ff25ef4a")
MODULES = {
    "dbio": "https://django-data-wizard.wq.io",
    "django-data-wizard": "https://django-data-wizard.wq.io",
    "django-media-thumbnailer": "https://github.com/sheppard/django-media-thumbnailer",
    "django-mustache": "https://github.com/sheppard/django-mustache",
    "django-natural-keys": "https://github.com/wq/django-natural-keys",
    "django-rest-pandas": "https://django-rest-pandas.wq.io",
    "django-swappable-models": "https://github.com/openwisp/django-swappable-models",
    "django-wq-template": "../wq.create/index.md",
    "html-json-forms": "https://github.com/wq/html-json-forms",
    "itertable": "https://django-data-wizard.wq.io/itertable/",
    "markdown": "https://github.com/wq/wq.markdown",
    "offline-website-logger": "https://github.com/sheppard/offline-website-logger",
    "python-requirejs": "https://github.com/sheppard/python-requirejs",
    "vera": "https://github.com/powered-by-wq/vera",
    "wq.core": "../wq.build/index.md",
    "wq.start": "../wq.create/index.md",
    "wq.start/releases": "https://wq.io/releases/?repo=wq.create",
    "wq-django-template/releases": "https://wq.io/releases/?repo=wq-django-template",
    "wq-django-template": "../wq.create/index.md",
    "wq.io": "https://django-data-wizard.wq.io/itertable/",
    "xlsform-converter": "https://github.com/wq/xlsform-converter",
    "xlsconv": "https://github.com/wq/xlsform-converter",
}
REPO_NAMES = {
    "django-wq-template": "wq-django-template",
    "wq.core": "wq.build",
    "wq.io": "itertable",
    "wq.start": "wq.create",
}
PACKAGES = {
    "wq.app": {
        "material",
        "react",
        "map",
    },
    "wq.create": {
        "cra-template",
    },
}
DEPRECATED_PACKAGES = {
    "jquery-mobile": "https://github.com/wq/wq.app/tree/v1.3.0/packages/jquery-mobile",
    "leaflet": "https://github.com/wq/wq.app/tree/v1.3.0/packages/leaflet",
    "mapbox": "../@wq/map-gl.md",
    "cra-template/template/src": "https://github.com/wq/wq.create/tree/main/packages/cra-template/template/src",
}
ALLOW_TREE = {
    "1.3",
    "main/modules.js",
    "main/LICENSES.md",
    "v1.1.2/packages/store/src/store.js",
    "v1.0.0b1/js/README.md",
    "v1.0.0b2/js/README.md",
}
DEPRECATED_TREE = {
    "master/CODE_OF_CONDUCT.md": "main/CODE_OF_CONDUCT.md",
    "master/CONTRIBUTING.md": "main/CONTRIBUTING.md",
    "master/contrib/files/models.py": "v0.6.0/contrib/files/models.py",
    "master/patterns/base/models.py": "main/wq/db/rest/models.py",
    "master/wq.yml": "main/wq.yml",
    "master/tests/": "main/tests/",
}
DOCS = {
    "chart": "https://django-rest-pandas.wq.io/serializers/",
    "chartapp-js": "https://django-rest-pandas.wq.io/@wq/chart",
    "pandas-js": "https://django-rest-pandas.wq.io/@wq/pandas",
    "chart-js": "https://django-rest-pandas.wq.io/@wq/chart",
    "progress-js": "https://django-data-wizard.wq.io/@wq/progress",
    "mapserv-js": "../@wq/map.md",
    "pagination-and-caching": "../config.md",
    "markdown": "https://github.com/wq/wq.markdown",
    "other-modules": "../wq.app/index.md",
    "template-js": "https://github.com/sheppard/django-mustache",
    "templates": "https://github.com/sheppard/django-mustache",
    "mustache-build": "https://github.com/sheppard/django-mustache",
    "wq-maketemplates": "https://github.com/sheppard/django-mustache",
    "jquery-mobile-scss-themes": "https://github.com/wq/wq.app/tree/v1.3.0/packages/jquery-mobile/scss/jquery-mobile.scss",
    "annotate": "../wq.db/patterns.md",
    "files": "../wq.db/patterns.md",
    "locate": "../wq.db/patterns.md",
    "relate": "../wq.db/patterns.md",
    "search": "../wq.db/patterns.md",
    "identify": "../wq.db/patterns.md",
    "autocomplete-js": "https://github.com/wq/wq.app/blob/v1.1.1/js/wq/autocomplete.js",
    "wq-phonegap": "https://github.com/wq/wq.app/blob/v1.3.0/build/phonegap.py",
    "wq-versions": "https://github.com/wq/wq.build/blob/v1.3.0/commands/info.py",
    "third-party": "https://github.com/wq/wq.app/tree/v1.1.1/js/README.md",
    "app.py": "../wq.db/rest.md",
    "pages-js": "../@wq/router.md",
    "app.js": "../@wq/app.md",
    "store.js": "../@wq/store.md",
    "map.js": "../@wq/map.md",
    "vera": "https://github.com/powered-by-wq/vera",
    "erav": "https://github.com/powered-by-wq/vera",
    "dbio": "https://django-data-wizard.wq.io",
    "sup": "../@wq/index.md",
    "collectjson": "../wq.build/collectjson.md",
    "rest": "../wq.db/rest.md",
    "build": "../wq.build/cli.md",
    "about-patterns": "../wq.db/patterns.md",
    "wq-icons": "../wq.build/icons.md",
    "loaders": "https://django-data-wizard.wq.io/itertable/loaders",
    "parsers": "https://django-data-wizard.wq.io/itertable/parsers",
    "mappers": "https://django-data-wizard.wq.io/itertable/mappers",
    "gis-io": "https://django-data-wizard.wq.io/itertable/gis",
    "custom-io": "https://django-data-wizard.wq.io/itertable/custom",
    "markdown-js": "https://github.com/wq/wq.markdown",
    "locate-js": "../inputs/Geo.md",
    "photos-js": "../inputs/Image.md",
    "app-js": "../@wq/app.md",
    "map-js": "../@wq/map.md",
    "store-js": "../@wq/store.md",
    "router-js": "../@wq/router.md",
    "model-js": "../@wq/model.md",
    "outbox-js": "../@wq/outbox.md",
    "app-plugins": "../plugins/index.md",
    "setup-local": "../guides/setup-wq-with-sqlite.md",
    "setup-ubuntu": "../guides/setup-wq-with-apache-postgresql.md",
    "setup": "../overview/setup.md",
    "config": "../config.md",
    "wq": "../wq.build/cli.md",
    "auth": "../wq.db/auth.md",
    "nested-forms": "../guides/implement-repeating-nested-forms.md",
    "eav-vs-relational": "../guides/eav-vs-relational.md",
    "views": "../wq.db/views.md",
    "router": "../wq.db/router.md",
    "about-rest": "../wq.db/rest.md",
}
OTHER_WQ_PATHS = {
    "chapters/app/docs": "../wq.app/index.md",
    "chapters/io/docs": "https://django-data-wizard.wq.io/itertable/",
    "wq.app/tests/swatches.html": "https://github.com/wq/wq.app/tree/v1.3.0/packages/jquery-mobile",
    "research/provenance": "https://andrewsheppard.net/research/provenance-volunteer-monitoring/",
}
OTHER_GITHUB_PATHS = {
    "blob/master/scss/wq/swatches.scss": "https://github.com/wq/wq.app/blob/v1.3.0/packages/jquery-mobile/scss/swatches.scss"
}
NEW_PATHS = [
    "@wq/",
    "config",
    "basemaps/",
    "components/",
    "guides/",
    "hooks/",
    "icons",
    "inputs/",
    "plugins/",
    "views/",
    "overlays/",
    "wq",
    "wq.app/",
    "wq.build/",
    "wq.create/",
    "wq.db/",
]


if __name__ == "__main__":
    main()
