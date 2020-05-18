import Ember from 'ember';
import { lte } from 'ember-compatibility-helpers';

(function() {
  let OWNER, CONTAINER;

  if (!Ember.getOwner || !Ember.setOwner) {
    OWNER = '__' + (Date.now()) + '_owner';
    CONTAINER = '__' + (Date.now()) + '_container';
  }

  if (!Ember.getOwner) {
    let REGISTRY = '__' + (Date.now()) + '_registry';
    let SAFE_LOOKUP_FACTORY_METHOD = '__' + (Date.now()) + '_lookupFactory';

    let factoryFor;
    if (typeof require === 'function') {
      try {
        let moduleResult = require('ember-factory-for-polyfill/vendor/ember-factory-for-polyfill/index');
        if (moduleResult) {
          factoryFor = moduleResult._factoryFor;
          moduleResult._updateSafeLookupFactoryMethod(SAFE_LOOKUP_FACTORY_METHOD);
        }
      } catch(e) {
        // if not found, we just don't support factoryFor
      }
    }

    class FakeOwner {
      constructor(object) {
        this[CONTAINER] = object.container;

        if (Ember.Registry) {
          // object.container._registry is used by 1.11
          this[REGISTRY] = object.container.registry || object.container._registry;
        } else {
          // Ember < 1.12
          this[REGISTRY] = object.container;
        }
      }

      factoryFor() {
        return factoryFor.apply(this, arguments);
      } 

      // ContainerProxyMixin methods
      //
      // => http://emberjs.com/api/classes/ContainerProxyMixin.html
      //
      lookup() {
        let container = this[CONTAINER];

        return container.lookup.apply(container, arguments);
      }

      _lookupFactory() {
        Ember.deprecate(
          'Using "_lookupFactory" is deprecated. Please use container.factoryFor instead.',
          false,
          { id: 'container-lookupFactory', until: '2.13.0', url: 'TODO' }
        );

        return this[SAFE_LOOKUP_FACTORY_METHOD].apply(this, arguments);
      }

      ownerInjection() {
        return {
          container: this[CONTAINER]
        };
      }

      // RegistryProxyMixin methods
      //
      // => http://emberjs.com/api/classes/RegistryProxyMixin.html
      //
      hasRegistration() {
        let registry = this[REGISTRY];

        return registry.has.apply(registry, arguments);
      }

      inject() {
        let registry = this[REGISTRY];

        return registry.injection.apply(registry, arguments);
      }

      register() {
        let registry = this[REGISTRY];

        return registry.register.apply(registry, arguments);
      }

      registerOption() {
        let registry = this[REGISTRY];

        return registry.option.apply(registry, arguments);
      }

      registerOptions() {
        let registry = this[REGISTRY];

        return registry.options.apply(registry, arguments);
      }

      registerOptionsForType() {
        let registry = this[REGISTRY];

        return registry.optionsForType.apply(registry, arguments);
      }

      registeredOption() {
        let registry = this[REGISTRY];

        return registry.getOption.apply(registry, arguments);
      }

      registeredOptions() {
        let registry = this[REGISTRY];

        return registry.getOptions.apply(registry, arguments);
      }

      registeredOptionsForType(type) {
        let registry = this[REGISTRY];

        if (registry.getOptionsForType) {
          return registry.getOptionsForType.apply(registry, arguments);
        } else {
          // used for Ember 1.10
          return registry._typeOptions[type];
        }
      }

      resolveRegistration() {
        let registry = this[REGISTRY];

        return registry.resolve.apply(registry, arguments);
      }

      unregister() {
        let registry = this[REGISTRY];

        return registry.unregister.apply(registry, arguments);
      }

      [SAFE_LOOKUP_FACTORY_METHOD]() {
        let container = this[CONTAINER];
  
        return container.lookupFactory.apply(container, arguments);
      }
    };

    function getOwner(object) {
      if (object[OWNER]) {
        return object[OWNER];
      }

      // Fallback to finding the owner on the container
      let container = object.container;
      if (!container) { return; }

      if (!container[OWNER]) {
        let owner = new FakeOwner(object);
        container[OWNER] = owner;
      }

      return container[OWNER];
    }

    Object.defineProperty(Ember, 'getOwner', {
      get: function() {
        return getOwner;
      }
    });
  }

  if (!Ember.setOwner) {
    function setOwner(object, owner) {
      object[OWNER] = owner;

      if (lte('1.13.13')) {
        if (owner && owner[CONTAINER]) {
          object.container = owner[CONTAINER];
        }
      }
    }

    Object.defineProperty(Ember, 'setOwner', {
      get: function() {
        return setOwner;
      }
    });
  }
})();
