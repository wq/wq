# thunks{}

The `thunks` [plugin type] can be used to define arbitrary asynchronous functions to be executed in response to Redux actions.  [@wq/router] provides thunks support via the [Redux-First Router] model, meaning they are defined internally as pathless routes (rather than Redux-Thunk-style action creators).

A thunks plugin should define a `thunks` object mapping each Redux action type to a thunk definition.  While it is not required, the plugin should generally also have a `name` and [reducer / actions][reducer] defined as well. 

```javascript
// src/search.js
export default {
    name: "search",
    actions: {
        runSearch(query) {
            return {
                "type": "RUN_SEARCH",
                "payload": {
                    "query": query
                }
            }
        }
    },
    thunks: {
        async RUN_SEARCH(dispatch, getState, bag) {
            const { action } = bag;
            const result = await someSearch(action.payload.query);
            dispatch({
                "type": "SEARCH_COMPLETE",
                "payload": result
            });
        }
    },
    reducer(state, action) { ... }
};

// src/index.js
import app from '@wq/app';
import search from './search';
import config from './config';

app.use(search);
app.init(config).then(...);

search.runSearch("example");  // @wq/store bound action
```

[plugin type]: ./index.md
[@wq/router]: ../@wq/router.md
[Redux-First Router]: https://github.com/faceyspacey/redux-first-router
[reducer]: ./reducer.md
