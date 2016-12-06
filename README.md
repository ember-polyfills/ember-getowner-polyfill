# ember-getowner-polyfill

This provides a polyfill for the `Ember.getOwner` feature added in Ember 2.3.

## Installation

```sh
ember install ember-getowner-polyfill
```

## Usage

```javascript
import Ember from 'ember';

export default Ember.Service.extend({
  someMethod() {
    let owner = Ember.getOwner(this);
    // do stuff with owner
  }
});
```

## Migration

### Applications

After you upgrade your application to Ember 2.3, you should remove `ember-getowner-polyfill` from
your `package.json`.

### Addons

Addons generally support many different Ember versions, so leaving `ember-getowner-polyfill` in
place for consumers of your addon is perfectly normal.  When the addon no longer supports Ember
versions older than 2.4, we recommend removing `ember-getowner-polyfill` from your `package.json`
and doing a major version bump.

## Documentation

The returned owner object should support all of the methods of the `ContainerProxyMixin` and `RegistryProxyMixin`.

* http://emberjs.com/api/classes/RegistryProxyMixin.html
* http://emberjs.com/api/classes/ContainerProxyMixin.html

## Compatibility

This addon is tested against quite a few past Ember versions. Check `config/ember-try.js` for the current list, but
the list of supported Ember versions at the time of authoring was:

* 1.10
* 1.11
* 1.12
* 1.13
* 2.0
* 2.1
* 2.2
* 2.3
* 2.4
* 2.8
* 2.12 (canary at the time)

## Addon Maintenance

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
