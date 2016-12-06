import Ember from 'ember';
import FakeOwner from './fake-owner';

let hasGetOwner = !!Ember.getOwner;

Ember.deprecate("ember-getowner-polyfill is now a true polyfill. Use Ember.getOwner directly instead of importing from ember-getowner-polyfill", false, {
  id: "ember-getowner-polyfill.import"
});

export default function(object) {
  let owner;

  if (hasGetOwner) {
    owner = Ember.getOwner(object);
  }

  if (!owner && object.container) {
    owner = new FakeOwner(object);
  }

  return owner;
}
