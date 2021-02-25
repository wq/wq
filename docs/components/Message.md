---
module: "@wq/react"
purpose: forms
---

# Message

@wq/react's `<Message/>` [component], and the corresponding [`useMessages()`][useMessages] hook, provide a general way to customize certain user messages in the application without needing to implement fully custom components.  To override a message, [register a plugin][plugins] with a `messages` attribute.  Do not override the `<Message/>` component itself.

```javascript
app.use({
    messages: {SUBMIT: 'Save Changes'}
});
```

## Supported Messages

code | message | used in
--|--|--
`OTHER_PAGES` | "Options" | [Index]
`MODEL_PAGES` | "Content" | [Index]
`CANCEL` | "Cancel" | [Login], [AutoForm] ([DefaultEdit])
`SUBMIT` | "Submit" | [Login], [AutoForm] ([DefaultEdit])
`LIST_IS_EMPTY` | "Empty list." | [DefaultList]
`SYNCED_ITEMS` | "Synced Items" | [DefaultList]
`CONFIRM_DELETE` | "Are you sure you want to delete this record?" | [DeleteForm] (in [DefaultEdit])
`CONFIRM_DELETE_TITLE` | "Confirm Deletion" | [DeleteForm (native)][DeleteForm]
`CONFIRM_DELETE_OK` | "Yes, Delete" | [DeleteForm (native)][DeleteForm]
`CONFIRM_DELETE_CANCEL` | "Cancel" | [DeleteForm (native)][DeleteForm]
`EMPTY_OUTBOX` | "Empty Outbox" | [OutboxList] 
`RETRY_ALL` | "Retry All" | [OutboxList]
`OUTBOX_IS_EMPTY` | "No items in outbox." | [OutboxList] 
`SYNC_ERROR` | " One or more errors found." | [OutboxList] 
`SYNC_SUCCESS` | "Successfully synced." | [OutboxList] 
`UNSYNCED_ITEMS` | "Unsynced Items" | [OutboxList] 
`LOGGED_OUT` | "Logged out." | [Logout]
`LOGGING_OUT` | "Logging out..." | [Logout]
`LOADING` | "Loading..." | [Loading]

## Source

The list of default messages is implemented here:
 * [messages.js (@wq/react)][react-messages-src]

While the `<Message/>` component is available here:

 * [Message.js (@wq/react)][react-src]

The [@wq/react] implementation just renders the message in a fragment as a string, so there is no alternate [@wq/material] or native version.

[component]: ./index.md
[useMessages]: ../hooks/useMessages.md
[plugins]: ../plugins/index.md

[Index]: ../views/Index.md
[AutoForm]: ./AutoForm.md
[Login]: ../views/Login.md
[DefaultList]: ../views/DefaultList.md
[DefaultEdit]: ../views/DefaultEdit.md
[DeleteForm]: ./DeleteForm.md
[OutboxList]: ./views/OutboxList.md
[Logout]: ../views/Logout.md
[Loading]: ../views/Loading.md

[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md

[react-messages-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/messages.js
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Message.js
