import Ember from 'ember';
import { module, test } from 'ember-qunit';
const { getOwner, setOwner } = Ember;

module('setOwner');

test('setOwner works with getOwner', function(assert) {
  let object = {};
  let owner = {};

  assert.strictEqual(getOwner(object), undefined, 'pre-condition: object has no owner');

  setOwner(object, owner);

  assert.strictEqual(getOwner(object), owner, 'the owner is set correctly');
});
