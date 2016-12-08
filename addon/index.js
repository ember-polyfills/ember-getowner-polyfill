import Ember from 'ember';

Ember.deprecate("ember-getowner-polyfill is now a true polyfill. Use Ember.getOwner directly instead of importing from ember-getowner-polyfill", false, {
  id: "ember-getowner-polyfill.import",
  until: '2.0.0'
});

export default Ember.getOwner;
