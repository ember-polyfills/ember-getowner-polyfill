import Ember from 'ember';
import FakeOwner from './fake-owner';

let getOwner;

if (Ember.getOwner) {
  getOwner = Ember.getOwner;
} else {
  getOwner = function(object) {
    return new FakeOwner(object);
  };
}

export default getOwner;
