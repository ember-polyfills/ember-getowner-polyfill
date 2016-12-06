import Ember from 'ember';

Ember.deprecate("ember-getowner-polyfill is now a true polyfill. Use Ember.getOwner directly instead of importing from ember-getowner-polyfill", false, {
  id: "ember-getowner-polyfill.import"
});

export default Ember.getOwner;
