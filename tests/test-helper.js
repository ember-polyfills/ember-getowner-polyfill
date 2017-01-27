import Ember from 'ember';
import QUnit from 'qunit';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

let deprecations;
Ember.Debug.registerDeprecationHandler((message, options, next) => {
  deprecations.push(message);
  next(message, options);
});

QUnit.testStart(function() {
  deprecations = [];
});

QUnit.assert.noDeprecationsOccurred = function() {
  this.deepEqual(deprecations, [], 'Expected no deprecations during test.');
};

QUnit.assert.deprecations = function(callback, expectedDeprecations) {
  let originalDeprecations = deprecations;
  deprecations = [];

  callback();
  this.deepEqual(deprecations, expectedDeprecations, 'Expected deprecations during test.');

  deprecations = originalDeprecations;
};
