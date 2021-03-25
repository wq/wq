# onsync(item)

The `onsync()` [plugin type] is called after an item in the outbox is succesfully synced (or has an error).  See [@wq/outbox] for the description of the available attributes.

Note that this function will be called each time an item is synced, regardless of how the item was created.  If you have custom code that calls `outbox.save()` directly, you can use `outbox.waitForItem(id)` instead of this plugin type.

[plugin type]: ./index.md
[@wq/outbox]: ../@wq/outbox.md
