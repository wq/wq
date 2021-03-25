# postsaveurl(item, alreadySynced)

The `postsaveurl()` [plugin type] is called after an item in the outbox is saved.  If `backgroundSync` is true, the plugin is executed immediately on submit.  Otherwise, [@wq/app] will wait for a response from the server before calling the plugin.  The URL (or redux action) returned from the function will be used to determine the next navigation state.

The default `postsaveurl()` behavior in [@wq/app] is to navigate to the list view (if `backgroundSync` is true) or to the detail view for the newly saved item (if `backgroundSync` is false).

[plugin type]: ./index.md
[@wq/app]: ../@wq/app.md
