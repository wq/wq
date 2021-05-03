---
repo: wq
date: 2020-09-29
---

# wq 1.3 alpha

**wq 1.3 alpha** introduces a brand new UI renderer based on [React](https://reactjs.org) and [Material UI](https://material-ui.com) (#41).  Since this is a prerelease, specify the `--pre` option when installing from PyPI:
```bash
python3 -m pip install wq --pre
```

See the submodule release notes (especially for wq.app) for additional details:
- [wq.app 1.3 alpha](./wq.app-1.3.0a1.md)
- [wq.core 1.3 alpha](./wq.build-1.3.0a1.md)
- [wq.db 1.3 alpha](./wq.db-1.3.0a1.md)
- [wq.start 1.3 alpha](./wq.create-1.3.0a1.md)

In addition, the `wq` repository now hosts the new [`wq` npm package](https://npmjs.com/package/wq), which provides a single wq.js module with all required dependencies built in.  This means wq can be used on any webpage with a single script tag:

```html
<script type="module">
    import wq from 'https://unpkg.com/wq';
    wq.init({});
</script>
```
