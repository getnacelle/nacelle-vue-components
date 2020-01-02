# Deprecation guidelines

- Ship backwards compatible changes which include supporting both the old and new API (make sure the full upgrade path is available)
- Support backwards compatibility for at least half of a major release cycle, but never more that 2 major release cycles
  - For example, before or part of 3.5, okay to remove in 4.0. After 3.5, remove in 5.0
  - Large changes consider a full major release cycle. For example, a large change in 3.1 would be removed in 5.0. But a large change in 2.9 would never wait until 5.0 to remove
- Use the `@deprecated` doc tag for props and components (ie. `/** @deprecated Use <quantity-selector /> instead. */`), state the reason, and upgrade path
- Add a console warning for any respective `@deprecated` doc tag, state the reason, and state the upgrade path
  - Add the console warning in the constructor for classes and in the render method for functional components
  ```
  // eslint-disable-next-line no-console
  console.warn(
    'Deprecation: <product-quantity-update /> is deprecated and will be removed in the next major version. Use <quantity-selector /> instead.',
  );
  ```
  - [Guidelines for writing good console messages](./Console%20messages.md)
- For significant deprecations, add a section to the component documentation with rationale. State the upgrade path and include a link to a new component if applicable
- Call out deprecations in our changelog

## Examples

- [Deprecation of `ProductQuantityUpdate`](https://github.com/getnacelle/nacelle-vue-components).