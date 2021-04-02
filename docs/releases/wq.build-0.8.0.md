---
repo: wq.core
date: 2015-04-30
---

# wq.core 0.8.0

Initial release of the `wq` command line tool as a separate package from [wq.app](../wq.app/index.md).

> Note: If you are upgrading an existing wq.app installation, we recommend uninstalling and re-installing wq.app. If you don't do this, the upgrade will likely install wq.core before upgrading wq.app, which will cause the new wq executable to be wiped out while uninstalling the old wq.app. If this happens, you may see an error like the following: `bash: /usr/local/bin/wq: No such file or directory`. The fix is to uninstall both wq.core and wq.app and then install wq.app again.
