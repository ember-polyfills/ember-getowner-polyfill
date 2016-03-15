import Ember from 'ember';
let CONTAINER = `__${new Date()}_container`;
let REGISTRY = `__${new Date()}_registry`;

export default class FakeOwner {
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

  // ContainerProxyMixin methods
  //
  // => http://emberjs.com/api/classes/ContainerProxyMixin.html
  //
  lookup() {
    return this[CONTAINER].lookup(...arguments);
  }

  _lookupFactory() {
    return this[CONTAINER].lookupFactory(...arguments);
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
    return this[REGISTRY].has(...arguments);
  }

  inject() {
    return this[REGISTRY].injection(...arguments);
  }

  register() {
    return this[REGISTRY].register(...arguments);
  }

  registerOption() {
    return this[REGISTRY].option(...arguments);
  }

  registerOptions() {
    return this[REGISTRY].options(...arguments);
  }

  registerOptionsForType() {
    return this[REGISTRY].optionsForType(...arguments);
  }

  registeredOption() {
    return this[REGISTRY].getOption(...arguments);
  }

  registeredOptions() {
    return this[REGISTRY].getOptions(...arguments);
  }

  registeredOptionsForType(type) {
    if (this[REGISTRY].getOptionsForType) {
      return this[REGISTRY].getOptionsForType(...arguments);
    } else {
      // used for Ember 1.10
      return this[REGISTRY]._typeOptions[type];
    }
  }

  resolveRegistration() {
    return this[REGISTRY].resolve(...arguments);
  }

  unregister() {
    return this[REGISTRY].unregister(...arguments);
  }
}
