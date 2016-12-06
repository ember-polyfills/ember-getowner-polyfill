var Ember = require('ember').default;
if (!Ember.getOwner) {
  Object.defineProperty(Ember, 'getOwner', {
    get: function() {
      var FakeOwner = require('ember-getowner-polyfill/fake-owner').default;
      return function(object) {
        if (object.container) {
          return new FakeOwner(object);
        }
      };
    }
  });
}
