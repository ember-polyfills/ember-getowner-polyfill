import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';
const { getOwner } = Ember;

moduleFor('foo:bar', {
  beforeEach() {
    this.register('whatever:lol', Ember.Object.extend({
      isLOL: true
    }));
  },

  afterEach(assert) {
    assert.noDeprecationsOccurred();
  }
});

test('calling getOwner multiple times returns the same object', function(assert) {
  let subject = this.subject();
  assert.equal(getOwner(subject), getOwner(subject));
});

test('calling getOwner multiple times with different objects that share a container returns the same object', function(assert) {
  let subject = this.subject();

  let owner = getOwner(subject);
  owner.register('foo:baz', Ember.Object.extend({
    isBaz: true
  }));

  let result = owner.lookup('foo:baz');

  assert.strictEqual(getOwner(subject), getOwner(result));
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

// In Ember 2.15 `_lookupFactory` was removed (in favor of `factoryFor`
if (!hasEmberVersion(2,15)) {
  test('it can use getOwner for the private _lookupFactory', function(assert) {
    let testFn = () => {
      let subject = this.subject();
      let owner = getOwner(subject);

      let Baz = Ember.Object.extend();
      Baz.reopenClass({ isBazFactory: true });

      owner.register('foo:baz', Baz);

      let result = owner._lookupFactory('foo:baz');

      assert.ok(result.isBazFactory, 'was able to register and _lookupFactory');
    };

    // we only can assert that a deprecation occurs when we are using
    // our custom `getOwner` polyfill. For Ember 2.3 - 2.11 we simply confirm
    // the functionality (not the deprecation).
    if (!hasEmberVersion(2,3) || hasEmberVersion(2,12)) {
      assert.deprecations(testFn, [
        'Using "_lookupFactory" is deprecated. Please use container.factoryFor instead.'
      ]);
    } else {
      testFn();
    }
  });
}

test('it can use getOwner for factoryFor', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);

  let Baz = Ember.Object.extend();
  Baz.reopenClass({ isBazFactory: true });

  owner.register('foo:baz', Baz);

  let result = owner.factoryFor('foo:baz');

  assert.ok(result.class.isBazFactory, 'was able to register and factoryFor');
  let instance = result.create();
  assert.ok(instance instanceof Baz, 'factoryFor().create() results in a valid instance');
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

test('it can use ownerInjection', function(assert) {
  let subject = this.subject();
  let owner = getOwner(subject);
  let baz = Ember.Object.create(owner.ownerInjection());
  let bazOwner = getOwner(baz);

  let result = bazOwner.lookup('whatever:lol');

  assert.ok(result.isLOL, 'was able to lookup');
});
