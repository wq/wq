---
permalink: /views/
wq_config:
  name: view
  url: views
  order: 26
  section: API Reference
  subsection: React Components
  icon_data: M3,19H9V12H3V19M10,19H22V12H10V19M3,5V11H22V5H3Z
  autoindex: false
---

# View Components

View components represent individual screens in the app, and define the layout of the content within the [<Main/>][Main] component.  The view component used to render a route is selected by the high level [`<App/>`][App] component by attempting a number of matches with increasing generality.  The configured [route name and mode][@wq/router] are most essential for matching.   These views are exported by [@wq/react], and rely on [useComponents()][useComponents] instead of importing components from [@wq/material] directly.

To specify a custom view (or override the defaults), register a [view components plugin][components-plugin].


name | description
--|--
[Default] | Fallback view for all routes that do not have a registered custom view, or a mode of "detail", "edit", or "list".
[DefaultDetail] | Default view for all "*_detail" routes.
[DefaultEdit] | Default view for all "*_edit" routes.
[DefaultList] | Default view for all "*_list" routes.
[Index] | Main index view for the app
[Loading] | View to show while waiting for RENDER
[Login] | Login form.
[Logout] | Logout form.
[NotFound] | 404 view
[OutboxList] | Lists all unsynced items in the outbox.
[Server] | Content loaded from the server (WIP)

[Message]: ../components/Message.md
[components]: ../components/index.md

[Main]: ../components/Main.md
[App]: ../components/App.md
[@wq/router]: ../@wq/router.md
[@wq/app]: ../@wq/router.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[components-plugin]: ../plugins/components.md

[useComponents]: ../hooks/useComponents.md

[Default]: ./Default.md
[DefaultDetail]: ./DefaultDetail.md
[DefaultEdit]: ./DefaultEdit.md
[DefaultList]: ./DefaultList.md
[Index]: ./Index.md
[Loading]: ./Loading.md
[Login]: ./Login.md
[Logout]: ./Logout.md
[NotFound]: ./NotFound.md
[OutboxList]: ./OutboxList.md
[Server]: ./Server.md
