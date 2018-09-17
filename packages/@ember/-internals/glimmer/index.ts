/**
  [Glimmer](https://github.com/tildeio/glimmer) is a templating engine used by Ember.js that is compatible with a subset of the [Handlebars](http://handlebarsjs.com/) syntax.

  ### Showing a property

  Templates manage the flow of an application's UI, and display state (through
  the DOM) to a user. For example, given a component with the property "name",
  that component's template can use the name in several ways:

  ```app/components/person-profile.js
  import Component from '@ember/component';

  export default Component.extend({
    name: 'Jill'
  });
  ```

  ```app/templates/components/person-profile.hbs
  {{name}}
  <div>{{name}}</div>
  <span data-name={{name}}></span>
  ```

  Any time the "name" property on the component changes, the DOM will be
  updated.

  Properties can be chained as well:

  ```handlebars
  {{aUserModel.name}}
  <div>{{listOfUsers.firstObject.name}}</div>
  ```

  ### Using Ember helpers

  When content is passed in mustaches `{{}}`, Ember will first try to find a helper
  or component with that name. For example, the `if` helper:

  ```handlebars
  {{if name "I have a name" "I have no name"}}
  <span data-has-name={{if name true}}></span>
  ```

  The returned value is placed where the `{{}}` is called. The above style is
  called "inline". A second style of helper usage is called "block". For example:

  ```handlebars
  {{#if name}}
  I have a name
  {{else}}
  I have no name
  {{/if}}
  ```

  The block form of helpers allows you to control how the UI is created based
  on the values of properties.
  A third form of helper is called "nested". For example here the concat
  helper will add " Doe" to a displayed name if the person has no last name:

  ```handlebars
  <span data-name={{concat firstName (
  if lastName (concat " " lastName) "Doe"
  )}}></span>
  ```

  Ember's built-in helpers are described under the [Ember.Templates.helpers](/api/ember/release/classes/Ember.Templates.helpers)
  namespace. Documentation on creating custom helpers can be found under
  [Helper](/api/classes/Ember.Helper.html).

  ### Invoking a Component

  Ember components represent state to the UI of an application. Further
  reading on components can be found under [Component](/api/ember/release/classes/Component).

  @module @ember/component
  @main @ember/component
  @public
 */

/**
 @module ember
 */

/**
 @class Ember.Templates.helpers
 @public
 */

/**
  Use the `{{with}}` helper when you want to alias a property to a new name. This is helpful
  for semantic clarity as it allows you to retain default scope or to reference a property from another
  `{{with}}` block.

  If the aliased property is "falsey", for example: `false`, `undefined` `null`, `""`, `0`, `NaN` or
  an empty array, the block will not be rendered.

  ```handlebars
  {{! Will only render if user.posts contains items}}
  {{#with user.posts as |blogPosts|}}
    <div class="notice">
      There are {{blogPosts.length}} blog posts written by {{user.name}}.
    </div>
    {{#each blogPosts as |post|}}
      <li>{{post.title}}</li>
    {{/each}}
  {{/with}}
  ```

  NOTE: The alias should not reuse a name from the bound property path.

  For example: `{{#with foo.bar as |foo|}}` is not supported because it attempts to alias using
  the first part of the property path, `foo`. Instead, use `{{#with foo.bar as |baz|}}`.

  @method with
  @for Ember.Templates.helpers
  @param {Object} options
  @return {String} HTML string
  @public
 */

/**
  `{{yield}}` denotes an area of a template that will be rendered inside
  of another template.

  ### Use with `Component`

  When designing components `{{yield}}` is used to denote where, inside the component's
  template, an optional block passed to the component should render:

  ```app/templates/application.hbs
  {{#labeled-textfield value=someProperty}}
    First name:
  {{/labeled-textfield}}
  ```

  ```app/templates/components/labeled-textfield.hbs
  <label>
    {{yield}} {{input value=value}}
  </label>
  ```

  Result:

  ```html
  <label>
    First name: <input type="text" />
  </label>
  ```

  Additionally you can `yield` properties into the context for use by the consumer:

  ```app/templates/application.hbs
  {{#labeled-textfield value=someProperty validator=(action 'firstNameValidator') as |validationError|}}
    {{#if validationError}}
      <p class="error">{{validationError}}</p>
    {{/if}}
    First name:
  {{/labeled-textfield}}
  ```

  ```app/templates/components/labeled-textfield.hbs
  <label>
    {{yield validationError}} {{input value=value}}
  </label>
  ```

  Result:

  ```html
  <label>
    <p class="error">First Name must be at least 3 characters long.</p>
    First name: <input type="text" />
  </label>
  ```
  @method yield
  @for Ember.Templates.helpers
  @param {Hash} options
  @return {String} HTML string
  @public
 */

/**
  Execute the `debugger` statement in the current template's context.

  ```handlebars
  {{debugger}}
  ```

  When using the debugger helper you will have access to a `get` function. This
  function retrieves values available in the context of the template.
  For example, if you're wondering why a value `{{foo}}` isn't rendering as
  expected within a template, you could place a `{{debugger}}` statement and,
  when the `debugger;` breakpoint is hit, you can attempt to retrieve this value:

  ```
  > get('foo')
  ```

  `get` is also aware of keywords. So in this situation

  ```handlebars
  {{#each items as |item|}}
    {{debugger}}
  {{/each}}
  ```

  You'll be able to get values from the current item:

  ```
  > get('item.name')
  ```

  You can also access the context of the view to make sure it is the object that
  you expect:

  ```
  > context
  ```

  @method debugger
  @for Ember.Templates.helpers
  @public
 */

/**
  The `partial` helper renders another template without
  changing the template context:

  ```handlebars
  {{foo}}
  {{partial "nav"}}
  ```

  The above example template will render a template named
  "-nav", which has the same context as the parent template
  it's rendered into, so if the "-nav" template also referenced
  `{{foo}}`, it would print the same thing as the `{{foo}}`
  in the above example.

  If a "-nav" template isn't found, the `partial` helper will
  fall back to a template named "nav".

  ### Bound template names

  The parameter supplied to `partial` can also be a path
  to a property containing a template name, e.g.:

  ```handlebars
  {{partial someTemplateName}}
  ```

  The above example will look up the value of `someTemplateName`
  on the template context (e.g. a controller) and use that
  value as the name of the template to render. If the resolved
  value is falsy, nothing will be rendered. If `someTemplateName`
  changes, the partial will be re-rendered using the new template
  name.

  @method partial
  @for Ember.Templates.helpers
  @param {String} partialName The name of the template to render minus the leading underscore.
  @public
*/

export { default as RootTemplate } from './lib/templates/root';
export { default as template } from './lib/template';
export { default as Checkbox } from './lib/components/checkbox';
export { default as TextField } from './lib/components/text_field';
export { default as TextArea } from './lib/components/text_area';
export { default as LinkComponent } from './lib/components/link-to';
export { default as Component, ROOT_REF } from './lib/component';
export { default as Helper, helper } from './lib/helper';
export { default as Environment } from './lib/environment';
export { SafeString, escapeExpression, htmlSafe, isHTMLSafe } from './lib/utils/string';
export {
  Renderer,
  InertRenderer,
  InteractiveRenderer,
  _resetRenderers,
  renderSettled,
} from './lib/renderer';
export {
  getTemplate,
  setTemplate,
  hasTemplate,
  getTemplates,
  setTemplates,
} from './lib/template_registry';
export { setupEngineRegistry, setupApplicationRegistry } from './lib/setup-registry';
export { DOMChanges, NodeDOMTreeConstruction, DOMTreeConstruction } from './lib/dom';
export {
  registerMacros as _registerMacros,
  experimentalMacros as _experimentalMacros,
} from './lib/syntax';
export { default as AbstractComponentManager } from './lib/component-managers/abstract';

// needed for test
// TODO just test these through public API
// a lot of these are testing how a problem was solved
// rather than the problem was solved
// DebugStack should just test the assert message
// it supports for example
export { UpdatableReference, INVOKE } from './lib/utils/references';
export { default as iterableFor } from './lib/utils/iterable';
export { default as DebugStack } from './lib/utils/debug-stack';
export { default as OutletView } from './lib/views/outlet';
export { capabilities } from './lib/component-managers/custom';
export { setComponentManager, getComponentManager } from './lib/utils/custom-component-manager';
export { isSerializationFirstNode } from './lib/utils/serialization-first-node-helpers';
