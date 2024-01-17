#!/usr/bin/env python3
import pathlib
import json


def main():
    update_general_components()
    update_input_components()


def update_general_components():
    update_components("components", "component")


def update_input_components():
    update_components("inputs", "input component")


def get_package_priority(package_name):
    if package_name == "react":
        return 0
    if package_name == "map":
        return 1
    if package_name.endswith("-web"):
        return 2
    if package_name.endswith("-native"):
        return 3
    return 4


def sort_package_content(package_content):
    return dict(
        sorted(package_content.items(), key=lambda p: get_package_priority(p[0]))
    )


def get_link_priority(label, target):
    if label == "index":
        return 0, 0, label
    elif label.startswith("@wq/"):
        return 1, get_package_priority(label.removeprefix("@wq/")), label
    elif target.endswith(".md"):
        return 2, 0, label
    elif target.startswith("https://github.com"):
        return 4, get_package_priority(label.removesuffix("-src")), label
    else:
        return 3, 0, label


def sort_links(links):
    return dict(sorted(links.items(), key=lambda l: get_link_priority(l[0], l[1])))


def update_components(folder, type_label):
    all_components = {}
    for package in PACKAGES.iterdir():
        components = package / "src" / folder
        if components.exists():
            for component in components.glob("*.js"):
                if not component.stem[0].isupper():
                    continue
                all_components.setdefault(component.stem, {})
                all_components[component.stem][package.name] = component.read_text()

    purposes = set()
    unseen_docs = set()
    docs = pathlib.Path(f"./{folder}")
    for docfile in docs.glob("*.md"):
        unseen_docs.add(docfile.stem)
        for line in docfile.read_text().split("\n"):
            if line.startswith("purpose: "):
                purposes.add(line.removeprefix("purpose: "))

    for component, package_content in sorted(all_components.items()):
        unseen_docs -= {component}
        package_content = sort_package_content(package_content)
        print(component, "[", " | ".join(package_content.keys()), "]")
        try:
            update_component(
                component,
                package_content,
                sorted(purposes),
                docs,
                folder,
                type_label,
            )
        except Exception as e:
            print(e)
            docfile = docs / f"{component}.md"
            if docfile.exists():
                print(docfile.read_text())
            raise
    unseen_docs -= {"App", "index"}
    if unseen_docs:
        print("Warning:", ", ".join(sorted(unseen_docs)), "no longer exist")


def update_component(
    component,
    package_content,
    purposes,
    docs,
    folder_name,
    type_label,
):
    docfile = docs / f"{component}.md"
    if docfile.exists():
        exist_content = docfile.read_text().strip().removeprefix("---\n")
        meta = {}
        if "\n---\n" in exist_content:
            front, body = exist_content.split("\n---\n")
            for row in front.split("\n"):
                key, val = row.split(": ")
                val = val.strip('"')
                meta[key] = val
        else:
            front = ""
            body = exist_content
        full_desc, refs = body.split("## Source\n")
        if type_label == "input component":
            full_desc = full_desc.replace(
                "[input component][inputs]", "[input component][index]"
            ).replace("[component]", "[index]")
        intro, desc = full_desc.split(f"[index]")
        intro = intro.strip() + "[index]"
        desc = desc.strip()
        sources = ""
        links = {}
        for row in refs.split("\n"):
            if row.startswith("[") and "]:" in row:
                label, target = row[1:].split("]: ")
                links[label] = target
            else:
                sources += f"{row}\n"
    else:
        meta = {}
        links = {}
        desc = ""
    links.setdefault("index", "./index.md")
    for package in package_content:
        doc_package = package.removesuffix("-web").removesuffix("-native")
        links[f"@wq/{doc_package}"] = f"../@wq/{doc_package}.md"
        links[
            f"{package}-src"
        ] = f"https://github.com/wq/wq.app/blob/main/packages/{package}/src/{folder_name}/{component}.js"
        main_package = doc_package

    meta["module"] = f"@wq/{main_package}"
    if type_label == "component" and "purpose" not in meta:
        meta["purpose"] = input(f"    Purpose Tag ({','.join(purposes)}): ")
    if not desc:
        desc = input(f"    @wq/{main_package}'s {component} component... ")

    intro = f"# {component}\n\n[@wq/{main_package}]'s `<{component}/>` [{type_label}][index] "
    packages = set(package_content.keys())
    if packages == {"react", "material-web", "material-native"}:
        sources = (
            "While [@wq/react] defines a [placeholder implementation][react-src],"
            " [@wq/material]'s versions are more useful as reference:\n\n"
            f" * [{component}.js (@wq/material-web)][material-web-src]\n"
            f" * [{component}.js (@wq/material-native)][material-native-src]\n"
        )
    elif packages == {"react", "material-web"}:
        sources = (
            "While [@wq/react] defines a [placeholder implementation][react-src],"
            " [@wq/material]'s version is more useful as reference:\n\n"
            f" * [{component}.js (@wq/material-web)][material-web-src]\n"
            "\n> There is currently no implementation of this component for @wq/material-native."
        )
    elif packages == {"react", "material-native"}:
        sources = (
            f"[@wq/react] provides a default implementation that is overridden when using [@wq/material-native].\n\n"
            f" * [{component}.js (@wq/react)][react-src]\n"
            f" * [{component}.js (@wq/material-native)][material-native-src]\n\n"
        )
    elif packages == {"react"}:
        sources = (
            f"The source code for `<{component}/>` is available here:\n\n"
            f" * [{component}.js (@wq/react)][react-src]\n\n"
            "This component should not generally need to be overridden directly."
        )
    elif packages == {"map", "map-gl-web", "map-gl-native"}:
        sources = (
            "While [@wq/map] defines a [placeholder implementation][map-src],"
            " [@wq/map-gl]'s versions are more useful as reference:\n\n"
            f" * [{component}.js (@wq/map-gl-web)][map-gl-web-src]\n"
            f" * [{component}.js (@wq/map-gl-native)][map-gl-native-src]\n"
        )
    elif packages == {"map", "map-gl-web"}:
        sources = (
            "While [@wq/map] defines a [placeholder implementation][map-src],"
            " [@wq/map-gl]'s version is more useful as reference:\n\n"
            f" * [{component}.js (@wq/map-gl-web)][map-gl-web-src]\n"
            "\n> There is currently no implementation of this component for @wq/map-gl-native."
        )
    elif packages == {"map-gl-web", "map-gl-native"}:
        sources = (
            "While [@wq/map] defines a placeholder implementation,"
            " [@wq/map-gl]'s version is more useful as reference:\n\n"
            f" * [{component}.js (@wq/map-gl-web)][map-gl-web-src]\n"
            "\n> There is currently no implementation of this component for @wq/map-gl-native."
        )
    elif packages == {"react", "map"}:
        sources = (
            f"[@wq/react] provides a default implementation that is overridden when using [@wq/map].\n\n"
            f" * [{component}.js (@wq/react)][react-src]\n"
            f" * [{component}.js (@wq/map)][map-src]\n\n"
        )
    elif packages == {"map"}:
        sources = (
            f"The source code for `<{component}/>` is available here:\n\n"
            f" * [{component}.js (@wq/map)][map-src]\n\n"
            "This component should not generally need to be overridden directly."
        )
    else:
        raise Exception(packages)

    for package, content in package_content.items():
        if len(package_content) > 1 and package in ("react", "map"):
            continue
        if (
            "return null; //FIXME" in content
            or "return null; // FIXME" in content
            or "NotImplemented" in content
        ):
            sources += (
                f"\n> The @wq/{package} implementation is currently just a placeholder."
            )
        elif "export default Fragment" in content:
            sources += (
                f"\n> The @wq/{package} implementation simply renders its children."
            )
        elif "function" not in content:
            imports = []
            exports = []
            for row in content.split("\n"):
                if "import" in row:
                    imports.append(row)
                if "export" in row:
                    exports.append(row)
            if len(imports) == 1 and len(exports) == 1:
                export_name = (
                    exports[0]
                    .split("export default")[1]
                    .strip()
                    .removesuffix(";")
                    .strip('"')
                )
                import_module = (
                    imports[0].split("from")[1].strip().removesuffix(";").strip('"')
                )
                if not import_module.startswith("."):
                    sources += f"\n> The @wq/{package} implementation just exports {export_name} from {import_module}."

    body = f"{intro}{desc}\n\n## Source\n\n{sources}\n\n"
    check_links = body.replace("][", "?[")
    for label in list(links.keys()):
        if f"[{label}]" not in check_links:
            links.pop(label)
    for part in check_links.split("["):
        if "{" in part or "]" not in part:
            continue
        label, _ = part.split("]", 1)
        if label not in links:
            target = input(f"    [{label}]: ")
            if target:
                links[label] = target
    for label, target in sort_links(links).items():
        body += f"[{label}]: {target.strip()}\n"

    if meta:
        front = "---\n"
        for key, val in sorted(meta.items()):
            if "@" in val:
                val = f'"{val}"'
            front += f"{key}: {val}\n"
        front += "---\n\n"
    else:
        front = ""
    docfile.write_text(front + body)
    # exit()


PACKAGES = pathlib.Path("../wq/app/packages")

if __name__ == "__main__":
    main()
