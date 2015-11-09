# ember-getowner-polyfill

This provides a polyfill for the `Ember.getOwner` feature added in Ember 2.3.

## Installation

```
ember install ember-getowner-polyfill
```

## Usage

```
import getOwner from 'ember-getowner-polyfill';

export default Ember.Service.extend({
  someMethod() {
    let owner = getOwner(this);
    // do stuff with owner
  }
});
```

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
* 2.3 (canary at the time)

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
