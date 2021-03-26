---
wq_config:
  name: icons
  url: icons
  order: 27
  section: API Reference
  subsection: "React Components"
  icon_data: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
---

# Icon Components

[@wq/react] and [@wq/material] define a vocabulary of icons to use throughout the app, particularly as the `icon` prop for [`<Button/>`][Button], [`<IconButton/>`][IconButton], [`<Fab/>`][Fab], and [`<ListItem/>`][ListItem].  The `icon` prop is specified as a string which is mapped to a component (in web), or to the name of a font icon (in native).  

Note that by default, @wq/material components that use the `icon` prop will only accept the names listed below.  To add more material icons to the vocabulary, register them via a [custom `icons` plugin][components-plugin].

Icon | Component |`icon` Prop Value | Description
--|--|--|--
![Add][Add-Icon] | `Add` | `"add"` | Used for "Add New Record" [`<Fab/>`][Fab] in [`<DefaultList/>`][DefaultList]
![Edit][Edit-Icon] | `Edit` | `"edit"` | Used for "Edit This Record" [`<Fab/>`][Fab] in [`<DefaultDetail/>`][DefaultDetail]
![Delete][Delete-Icon] | `Delete` | `"delete"` | Used for [`<DeleteForm/>`][DeleteForm] in [DefaultEdit]
![Success][Success-Icon] | `Success` | `"success"` | Shown in [`<OutboxList/>`][OutboxList] for synced records
![Error][Error-Icon] | `Error` | `"error"` | Shown in [`<OutboxList/>`][OutboxList] for failed sync attempts
![Pending][Pending-Icon] | `Pending` | `"pending"` | Shown in [`<OutboxList/>`][OutboxList] for currently syncing records
![GpsStart][GpsStart-Icon] | `GpsStart` | `"gps-start"` |  Used in [Geo] input component
![GpsStop][GpsStop-Icon] | `GpsStop` | `"gps-stop"` |  Used in [Geo] input component
![Search][Search-Icon] | `Search` | `"search"` |  Used in [Geo] input component

> The default icons are defined in @wq/material's [src/icons.js] and [src/icons.native.js].

[@wq/react]: ./@wq/react.md
[@wq/material]: ./@wq/material.md
[Button]: ./components/Button.md
[IconButton]: ./components/IconButton.md
[Fab]: ./components/Fab.md
[ListItem]: ./components/ListItem.md
[components-plugin]: ./plugins/components.md
[DefaultList]: ./views/DefaultList.md
[DefaultDetail]: ./views/DefaultDetail.md
[DefaultEdit]: ./views/DefaultEdit.md
[OutboxList]: ./views/OutboxList.md
[DeleteForm]: ./components/DeleteForm.md
[Geo]: ./inputs/Geo.md

[src/icons.js]: http://github.com/wq/wq.app/tree/main/packages/material/src/icons.js
[src/icons.native.js]: http://github.com/wq/wq.app/tree/main/packages/material/src/icons.native.js

[Add-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/content/add/materialicons/24px.svg
[Edit-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/image/edit/materialicons/24px.svg
[Delete-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/action/delete/materialicons/24px.svg
[Success-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/action/done/materialicons/24px.svg
[Error-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/alert/error/materialicons/24px.svg
[Pending-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/notification/sync/materialicons/24px.svg
[GpsStart-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/device/gps_fixed/materialicons/24px.svg
[GpsStop-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/device/gps_off/materialicons/24px.svg
[Search-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/action/search/materialicons/24px.svg
