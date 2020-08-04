// HINT: use `wq maketemplates` instead of copying and modyfing this file.
const templates = {};

templates.index = `<html>
  <head>
    <title>wq demo</title>
  </head>
  <body>
    <div data-role="page" class="ui-page">
      <div data-role="header">
        <h1>wq demo</h1>
      </div>
      <div role="main" class="ui-content">
        <p>Hello, world!</p>
        <ul data-role="listview">
          {{#pages}}
          <li><a href="{{rt}}/{{url}}{{#list}}/{{/list}}">{{name}} {{#list}}list{{/list}}</a></li>
          {{/pages}}
        </ul>
      </div>
      <p class="footer">
        wq demo
        &bull;
        Powered by <a href="https://wq.io/">wq</a>
      </p>
    </div>
  </body>
</html>`;

templates.site_list = `<html>
  <head>
    <title>site List</title>
  </head>
  <body>
    <div data-role="page" data-wq-sync-refresh="true">
      <div data-role="header">
        {{>home}}
        <h1>site List</h1>
        {{#page_config.can_add}}
        <a href="{{rt}}/sites/new" data-icon="plus">
          Add New
        </a>
        {{/page_config.can_add}}
      </div>
      <div role="main" class="ui-content">
        {{#unsynced}}
        <ul data-role="listview" data-inset="true">
          <li data-role="list-divider">Outbox</li>
          {{#unsyncedItems}}
          <li data-icon="{{#error}}alert{{/error}}{{^error}}minus{{/error}}">
            <a href="{{rt}}/outbox/{{id}}/edit">
              {{#label}}{{label}}{{/label}}
              {{^label}}Unsynced Item #{{id}}{{/label}}
            </a>
          </li>
          {{/unsyncedItems}}
          <li>
            <div class="ui-grid-a ui-responsive">
              <div class="ui-block-a">
                {{#is_authenticated}}
                <button class="sync" data-icon="refresh"
                    onclick="require('wq/app').sync(true);">
                  {{#syncing}}Syncing...{{/syncing}}
                  {{^syncing}}Sync Now{{/syncing}}
                </button>
                {{/is_authenticated}}
                {{^is_authenticated}}
                <a href="{{rt}}/login" data-role="button" data-icon="lock">
                  Log in to Sync
                </a>
                {{/is_authenticated}}
              </div>
              <div class="ui-block-b">
                <button type="button" data-icon="delete"
                  onclick="require('wq/app').emptyOutbox(true);">
                  Discard
                </button>
              </div>
            </div>
          </li>
        </ul>
        {{/unsynced}}
        <div class="ui-grid-a ui-responsive">
        <div class="ui-block-a">
          <ul data-role="listview" data-filter="true" data-inset="true">
            {{#unsynced}}
            <li data-role="list-divider">Synced Items</li>
            {{/unsynced}}
            {{#list}}
            <li>
              <a href="{{rt}}/sites/{{id}}">{{label}}</a>
            </li>
            {{/list}}
            {{#page_config.can_add}}
            <li data-icon="plus" data-theme="b">
              <a href="{{rt}}/sites/new">Add site</a>
            </li>
            {{/page_config.can_add}}
          </ul>
        </div>
        <div class="ui-block-b">
          <div class='map list-map' id="site-map"></div>
        </div>
        </div>
      </div>
    </div>
  </body>
</html>`;

templates.site_detail = `<html>
  <head>
    <title>{{label}}</title>
  </head>
  <body>
    <div data-role="page">
      <div data-role="header">
        {{>home}}
        <h1>{{label}}</h1>
        {{#page_config.can_change}}
        <a href="{{rt}}/sites/{{id}}/edit" data-icon="edit" data-transition="flip">
          Edit
        </a>
        {{/page_config.can_change}}
      </div>
      <div role="main" class="ui-content">
        <div class="ui-grid-a ui-responsive">
        <div class="ui-block-a">
          <h1>{{label}}</h1>
          <table>
            <tr>
              <th>Name</th>
              <td>{{name}}</td>
            </tr>
          </table>
          <ul data-role="listview" data-inset="true">
            <li>
              <a href="{{rt}}/sites/{{id}}/observations">Observations</a>
            </li>
          </ul>
        </div>
        <div class="ui-block-b">
          <div class="map detail-map" id="site-{{id}}-map"></div>
        </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

templates.site_edit = `<html>
  <head>
    <title>{{^id}}Add{{/id}}{{#id}}Edit{{/id}} site</title>
  </head>
  <body>
    <div data-role="page">
      <div data-role="header">
        {{>home}}
        <h1>{{^id}}Add{{/id}}{{#id}}Edit{{/id}} site</h1>
        {{#id}}
        {{#page_config.can_delete}}
        <form action="{{svc}}/sites/{{id}}" method="post" data-ajax="false"
          data-wq-json="true" data-wq-background-sync="false"
          onsubmit="return require('wq/app').confirmSubmit(this, 'Are you sure you want to delete this record?');">
          <input type=hidden name="_method" value="DELETE">
          <button type="submit" data-icon="delete" class="ui-btn-right">
            Delete
          </button>
        </form>
        {{/page_config.can_delete}}
        {{/id}}
      </div>
      <div role="main" class="ui-content">
        <form action="{{svc}}/sites/{{id}}" method="post" data-ajax="false"
            data-wq-json="true"
            {{#outbox_id}}
              data-wq-outbox-id="{{outbox_id}}"
              data-wq-outbox-preserve=""
            {{/outbox_id}}>
          {{#id}}
          <input type=hidden name="_method" value="PUT">
          {{/id}}
          <ul data-role="listview" data-inset="true">
            <li class="ui-field-contain">
              <label for='site-name'>Name</label>
              <input id='site-name' type='text' data-xform-type='string' name='name' required value="{{name}}">
              <p class='error site-name-errors'></p>
            </li>
            <li>
              <label for='site-geometry'>Location</label>
              <input type='hidden' data-xform-type='geopoint' name='geometry' required>
              <div class="map edit-map" id='site-{{id}}{{^id}}new{{/id}}-edit-map'></div>
              <p class='error site-geometry-errors'></p>
            </li>
            <li>
              <div class="ui-grid-a">
                <div class="ui-block-a">
                  <a href="{{rt}}/sites/{{id}}" data-role="button" data-icon="back" data-direction="reverse">
                    Back
                  </a>
                </div>
                <div class="ui-block-b">
                  <button type="submit" data-icon="check" data-theme="b">
                    Submit
                  </button>
                </div>
              </div>
              <p class="error site-errors"></p>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </body>
</html>`;

templates.observation_list = `<html>
  <head>
    <title>observation List{{#parent_id}} for {{parent_label}}{{/parent_id}}</title>
  </head>
  <body>
    <div data-role="page" data-wq-sync-refresh="true">
      <div data-role="header">
        {{>home}}
        <h1>observation List{{#parent_id}} for {{parent_label}}{{/parent_id}}</h1>
        {{#page_config.can_add}}
        <a href="{{rt}}/observations/new{{#parent_id}}?{{parent_page}}_id={{parent_id}}{{/parent_id}}" data-icon="plus">
          Add New
        </a>
        {{/page_config.can_add}}
      </div>
      <div role="main" class="ui-content">
        {{#parent_id}}
        <p>
          <a href="{{rt}}/{{parent_url}}">&lt; Back to {{parent_label}}</a>
        </p>
        {{/parent_id}}
        {{#unsynced}}
        <ul data-role="listview" data-inset="true">
          <li data-role="list-divider">Outbox</li>
          {{#unsyncedItems}}
          <li data-icon="{{#error}}alert{{/error}}{{^error}}minus{{/error}}">
            <a href="{{rt}}/outbox/{{id}}/edit">
              {{#label}}{{label}}{{/label}}
              {{^label}}Unsynced Item #{{id}}{{/label}}
            </a>
          </li>
          {{/unsyncedItems}}
          <li>
            <div class="ui-grid-a ui-responsive">
              <div class="ui-block-a">
                {{#is_authenticated}}
                <button class="sync" data-icon="refresh"
                    onclick="require('wq/app').sync(true);">
                  {{#syncing}}Syncing...{{/syncing}}
                  {{^syncing}}Sync Now{{/syncing}}
                </button>
                {{/is_authenticated}}
                {{^is_authenticated}}
                <a href="{{rt}}/login" data-role="button" data-icon="lock">
                  Log in to Sync
                </a>
                {{/is_authenticated}}
              </div>
              <div class="ui-block-b">
                <button type="button" data-icon="delete"
                  onclick="require('wq/app').emptyOutbox(true);">
                  Discard
                </button>
              </div>
            </div>
          </li>
        </ul>
        {{/unsynced}}
          <ul data-role="listview" data-filter="true" data-inset="true">
            {{#unsynced}}
            <li data-role="list-divider">Synced Items</li>
            {{/unsynced}}
            {{#list}}
            <li>
              <a href="{{rt}}/observations/{{id}}">{{label}}</a>
            </li>
            {{/list}}
            {{#page_config.can_add}}
            <li data-icon="plus" data-theme="b">
              <a href="{{rt}}/observations/new{{#parent_id}}?{{parent_page}}_id={{parent_id}}{{/parent_id}}">Add observation</a>
            </li>
            {{/page_config.can_add}}
          </ul>
      </div>
      {{>paginator}}
    </div>
  </body>
</html>`;

templates.observation_detail = `<html>
  <head>
    <title>{{label}}</title>
  </head>
  <body>
    <div data-role="page">
      <div data-role="header">
        {{>home}}
        <h1>{{label}}</h1>
        {{#page_config.can_change}}
        <a href="{{rt}}/observations/{{id}}/edit" data-icon="edit" data-transition="flip">
          Edit
        </a>
        {{/page_config.can_change}}
      </div>
      <div role="main" class="ui-content">
          <h1>{{label}}</h1>
          <table>
            <tr>
              <th>Site</th>
              <td>{{site_label}}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{{date}}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{{notes}}</td>
            </tr>
          </table>
      </div>
    </div>
  </body>
</html>`;

templates.observation_edit = `<html>
  <head>
    <title>{{^id}}Add{{/id}}{{#id}}Edit{{/id}} observation</title>
    {{>head}}
  </head>
  <body>
    <div data-role="page">
      <div data-role="header">
        {{>home}}
        <h1>{{^id}}Add{{/id}}{{#id}}Edit{{/id}} observation</h1>
        {{#id}}
        {{#page_config.can_delete}}
        <form action="{{svc}}/observations/{{id}}" method="post" data-ajax="false"
          data-wq-json="true" data-wq-background-sync="false"
          onsubmit="return require('wq/app').confirmSubmit(this, 'Are you sure you want to delete this record?');">
          <input type=hidden name="_method" value="DELETE">
          <button type="submit" data-icon="delete" class="ui-btn-right">
            Delete
          </button>
        </form>
        {{/page_config.can_delete}}
        {{/id}}
      </div>
      <div role="main" class="ui-content">
        <form action="{{svc}}/observations/{{id}}" method="post" data-ajax="false"
            data-wq-json="true"
            {{#outbox_id}}
              data-wq-outbox-id="{{outbox_id}}"
            {{/outbox_id}}>
          {{>csrf}}
          {{#id}}
          <input type=hidden name="_method" value="PUT">
          {{/id}}
          <ul data-role="listview" data-inset="true">
            <li class="ui-field-contain">
              <label for='observation-site_id'>Site</label>
              <select id='observation-site_id' data-xform-type='string' name='site_id'>
                <option value="">Select one...</option>
                {{#site_list}}
                <option value="{{id}}"{{#selected}} selected{{/selected}}>
                 {{#outbox}}*{{/outbox}} {{label}}
                </option>
                {{/site_list}}
              </select>
              <p class='error observation-site_id-errors'></p>
            </li>
            <li class="ui-field-contain">
              <label for='observation-date'>Date</label>
              <input id='observation-date' type='date' data-xform-type='date' name='date' value="{{date}}">
              <p class='error observation-date-errors'></p>
            </li>
            <li class="ui-field-contain">
              <label for='observation-notes'>Notes</label>
              <textarea id='observation-notes' name='notes' data-xform-type="text">{{notes}}</textarea>
              <p class='error observation-notes-errors'></p>
            </li>
            <li>
              <div class="ui-grid-a">
                <div class="ui-block-a">
                  <a href="{{rt}}/observations/{{id}}" data-role="button" data-icon="back" data-direction="reverse">
                    Back
                  </a>
                </div>
                <div class="ui-block-b">
                  <button type="submit" data-icon="check" data-theme="b">
                    Submit
                  </button>
                </div>
              </div>
              <p class="error observation-errors"></p>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </body>
</html>`;

templates.partials = {};
templates.partials.home = `
<a href="{{rt}}/" data-icon="home" data-direction="reverse" data-theme="b">
  Home
</a>`;

export default templates;
