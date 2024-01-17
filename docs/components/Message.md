---
module: "@wq/react"
purpose: forms
---

# Message

[@wq/react]'s `<Message/>` [component][index] , and the corresponding [`useMessages()`][useMessages] hook, provide a general way to customize certain user messages in the application without needing to implement fully custom components.  To override a message, [register a plugin][plugins] with a `messages` attribute.  Do not override the `<Message/>` component itself.

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

The source code for `<Message/>` is available here:

 * [Message.js (@wq/react)][react-src]

This component should not generally need to be overridden directly.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[AutoForm]: ./AutoForm.md
[DefaultEdit]: ../views/DefaultEdit.md
[DefaultList]: ../views/DefaultList.md
[DeleteForm]: ./DeleteForm.md
[Index]: ../views/Index.md
[Loading]: ../views/Loading.md
[Login]: ../views/Login.md
[Logout]: ../views/Logout.md
[OutboxList]: ../views/OutboxList.md
[plugins]: ../plugins/index.md
[useMessages]: ../hooks/useMessages.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Message.js
