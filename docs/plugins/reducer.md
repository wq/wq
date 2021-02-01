# `reducer(state, action)` & `actions`

The `reducer()` plugin type makes it possible to define a [reducer] that subscribes to Redux actions and updates a plugin-specific state.  Reducer plugins and are generally defined with a `name` and an `action` object containing [action creator functions][action-creators].  The action creators are bound to the dispatch method and re-attached to the plugin, as shown in the example below.

```javascript
// src/timer.js
export default {
    name: "timer",
    actions: {
        startTimer() {
            return {
                "type": "START_TIMER"
            };
        },
        stopTimer() {
            return {
                "type": "STOP_TIMER"
            };
        }
    },
    reducer(timerState={}, action) {
        switch (action.type) {
            case "START_TIMER":
                return {"active": true};
            case "STOP_TIMER":
                return {"active": false};
            default:
                return timerState;
        }
    }
};

// src/index.js
import app from '@wq/app';
import timer from './timer';
import config from './config';

app.use(timer);
app.init(config).then(...);

timer.start(); // Equivalent to app.store.dispatch(timer.actions.start())
timer.stop();
```

Most often, you will want to use a reducer plugin in a custom component, together with the [`usePluginReducer()`][usePluginReducer] hook.

[reducer]: https://redux.js.org/basics/reducers
[action-creators]: https://redux.js.org/basics/actions#action-creators
[usePluginReducer]: ../hooks/usePluginReducer.md
