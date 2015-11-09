import Ember from 'ember';
import FakeOwner from './fake-owner';

let hasGetOwner = !!Ember.getOwner;

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
