import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import { moduleFor, test } from 'ember-qunit';

moduleFor('foo:bar', {
  beforeEach() {
    this.register('whatever:lol', Ember.Object.extend({
      isLOL: true
    }));
  }
});

test('it can use getOwner to look things up', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);

  let result = owner.lookup('whatever:lol');

  assert.ok(result.isLOL, 'was able to lookup');
});

test('it can use getOwner to register things', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);

  owner.register('foo:baz', Ember.Object.extend({
    isBaz: true
  }));

  let result = owner.lookup('foo:baz');

  assert.ok(result.isBaz, 'was able to register and lookup');
});

test('it can use getOwner for the private _lookupFactory', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);

  let Baz = Ember.Object.extend();
  Baz.reopenClass({ isBazFactory: true });

  owner.register('foo:baz', Baz);

  let result = owner._lookupFactory('foo:baz');

  assert.ok(result.isBazFactory, 'was able to register and _lookupFactory');
});

test('it can use hasRegistration', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);

  let result = owner.hasRegistration('whatever:lol');

  assert.ok(result, 'hasRegistration works');
});

test('it can use inject', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);

  owner.inject('whatever:lol', 'baz', 'foo:baz');
  owner.register('foo:baz', Ember.Object.extend({
    isBaz: true
  }));

  let result = owner.lookup('whatever:lol');

  assert.ok(result.get('baz.isBaz'), 'inject worked properly');
});

test('it can use registerOptionsForType', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);

  owner.registerOptionsForType('lol', { instantiate: false });

  let result = owner.registeredOptionsForType('lol');

  assert.deepEqual(result, { instantiate: false }, 'registerdOptionsForType worked properly');
});

test('it can use resolveRegistration', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);
  let Baz = Ember.Object.extend();

  owner.register('foo:baz', Baz);

  let result = owner.resolveRegistration('foo:baz');

  assert.equal(result, Baz, 'was able to resolveRegistration');
});

test('it can use unregister', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);
  let Baz = Ember.Object.extend();
  let result;

  owner.register('foo:baz', Baz);

  result = owner.resolveRegistration('foo:baz');

  assert.equal(result, Baz, 'was able to resolveRegistration');

  owner.unregister('foo:baz');

  result = owner.resolveRegistration('foo:baz');

  assert.equal(result, undefined, 'was able to resolveRegistration');
});
