---
repo: wq.db
date: 2015-01-31
---

# wq.db 0.7.1

**wq.db 0.7.1** brings a couple of minor bug fixes to 0.7.0:
- Encoded URLs in `pages_info` object ([`0e1de58`](https://github.com/wq/wq.db/commit/0e1de5823272b7090149d1dc42c3bae2bd2dc64e); see [wq.app 0.7.1 release notes](./wq.app-0.7.1.md))
- Fix recursion error in `multi.json` ([`8b1550f`](https://github.com/wq/wq.db/commit/8b1550f))
- Ensure [relate](../wq.db/patterns.md)'s cached `dict` representations are updated after a `save()` ([`3e5ce5c`](https://github.com/wq/wq.db/commit/3e5ce5c))
- More tests
