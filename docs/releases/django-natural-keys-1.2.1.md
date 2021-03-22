---
repo: django-natural-keys
date: 2017-09-13
---

# natural-keys 1.2.1

natural-keys 1.2.1 brings a couple of improvements to `NaturalKeySerializer`:

 * More descriptive error message if `include_fields` is incorrect (#2 via @tomaszn)
 * Support for models with single unique field instead of `unique_together` (60b332748b826422ef883ad720652003d63ba9a2)
