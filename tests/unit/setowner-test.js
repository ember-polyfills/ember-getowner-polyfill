import Ember from 'ember';
import EmberObject from '@ember/object';
import { getOwner, setOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { moduleFor, test } from 'ember-qunit';
import { lte } from 'ember-compatibility-helpers'

moduleFor('foo:bar', {
  afterEach(assert) {
    assert.noDeprecationsOccurred();
  }
});

test('setOwner works with getOwner', function(assert) {
  let object = {};
  let owner = {};

  assert.strictEqual(getOwner(object), undefined, 'pre-condition: object has no owner');

  setOwner(object, owner);

  assert.strictEqual(getOwner(object), owner, 'the owner is set correctly');
});

if (lte('1.13.13')) {
  test('[Ember 1.x]: setOwner sets the container if the owner has a container', function(assert) {
    this.register('service:session', Ember.Object);

    let Foo = EmberObject.extend({
      session: service()
    });

    let foo = Foo.create();

    setOwner(foo, getOwner(this));

    assert.ok(!!foo.get('session'), 'session injection exists');
  });

  test('[Ember 1.x]: setOwner does not crash if the owner does not have a container', function(assert) {
    this.register('service:session', Ember.Object);

    let Foo = EmberObject.extend({
      session: service()
    });

    let owner = {};
    let foo = Foo.create();

    setOwner(foo, owner);

    assert.throws(() => {
      foo.get('session');
    }, /Attempting to lookup an injected property on an object without a container/)
  });

  test('[Ember 1.x]: setOwner does not crash if the owner is undefined', function() {
    setOwner({}, undefined);
  });
}
