/* globals Ember, require */

(function() {
  var _Ember;

  if (typeof Ember !== 'undefined') {
    _Ember = Ember;
  } else {
    _Ember = require('ember').default;
  }

  if (!_Ember.getOwner) {
    var CONTAINER = '__' + (Date.now()) + '_container';
    var REGISTRY = '__' + (Date.now()) + '_registry';
    var OWNER = '__' + (Date.now()) + '_owner';
    var SAFE_LOOKUP_FACTORY_METHOD = '__' + (Date.now()) + '_lookupFactory';

    var factoryFor;
    if (typeof require === 'function') {
      try {
        var moduleResult = require('ember-factory-for-polyfill/vendor/ember-factory-for-polyfill/index');
        if (moduleResult) {
          factoryFor = moduleResult._factoryFor;
          moduleResult._updateSafeLookupFactoryMethod(SAFE_LOOKUP_FACTORY_METHOD);
        }
      } catch(e) {
        // if not found, we just don't support factoryFor
      }
    }

    var FakeOwner = function FakeOwner(object) {
      this[CONTAINER] = object.container;

      if (_Ember.Registry) {
        // object.container._registry is used by 1.11
        this[REGISTRY] = object.container.registry || object.container._registry;
      } else {
        // Ember < 1.12
        this[REGISTRY] = object.container;
      }
    };

    FakeOwner.prototype = {
      constructor: FakeOwner,

      factoryFor: factoryFor,

      // ContainerProxyMixin methods
      //
      // => http://emberjs.com/api/classes/ContainerProxyMixin.html
      //
      lookup: function() {
        var container = this[CONTAINER];

        return container.lookup.apply(container, arguments);
      },

      _lookupFactory: function() {
        Ember.deprecate(
          'Using "_lookupFactory" is deprecated. Please use container.factoryFor instead.',
          false,
          { id: 'container-lookupFactory', until: '2.13.0', url: 'TODO' }
        );

        return this[SAFE_LOOKUP_FACTORY_METHOD].apply(this, arguments);
      },

      ownerInjection: function() {
        return {
          container: this[CONTAINER]
        };
      },

      // RegistryProxyMixin methods
      //
      // => http://emberjs.com/api/classes/RegistryProxyMixin.html
      //
      hasRegistration: function() {
        var registry = this[REGISTRY];

        return registry.has.apply(registry, arguments);
      },

      inject: function() {
        var registry = this[REGISTRY];

        return registry.injection.apply(registry, arguments);
      },

      register: function() {
        var registry = this[REGISTRY];

        return registry.register.apply(registry, arguments);
      },

      registerOption: function() {
        var registry = this[REGISTRY];

        return registry.option.apply(registry, arguments);
      },

      registerOptions: function() {
        var registry = this[REGISTRY];

        return registry.options.apply(registry, arguments);
      },

      registerOptionsForType: function() {
        var registry = this[REGISTRY];

        return registry.optionsForType.apply(registry, arguments);
      },

      registeredOption: function() {
        var registry = this[REGISTRY];

        return registry.getOption.apply(registry, arguments);
      },

      registeredOptions: function() {
        var registry = this[REGISTRY];

        return registry.getOptions.apply(registry, arguments);
      },

      registeredOptionsForType: function(type) {
        var registry = this[REGISTRY];

        if (registry.getOptionsForType) {
          return registry.getOptionsForType.apply(registry, arguments);
        } else {
          // used for Ember 1.10
          return registry._typeOptions[type];
        }
      },

      resolveRegistration: function() {
        var registry = this[REGISTRY];

        return registry.resolve.apply(registry, arguments);
      },

      unregister: function() {
        var registry = this[REGISTRY];

        return registry.unregister.apply(registry, arguments);
      }
    };

    FakeOwner.prototype[SAFE_LOOKUP_FACTORY_METHOD] = function() {
      var container = this[CONTAINER];

      return container.lookupFactory.apply(container, arguments);
    };

    Object.defineProperty(_Ember, 'getOwner', {
      get: function() {
        return function(object) {
          var container = object.container;
          if (!container) { return; }

          if (!container[OWNER]) {
            var owner = new FakeOwner(object);
            container[OWNER] = owner;
          }

          return container[OWNER];
        };
      }
    });
  }
})();
