/*jshint node:true*/

module.exports = {
  scenarios: [
    {
      name: 'ember-1.10',
      bower: {
        dependencies: {
          "ember": "~1.10.0"
        }
      }
    },
    {
      name: 'ember-1.11',
      bower: {
        dependencies: {
          "ember": "~1.11.3"
        }
      }
    },
    {
      name: 'ember-1.12',
      bower: {
        dependencies: {
          "ember": "~1.12.1"
        }
      }
    },
    {
      name: 'ember-1.13',
      bower: {
        dependencies: {
          "ember": "~1.13.8"
        }
      }
    },
    {
      name: 'ember-2.0',
      bower: {
        dependencies: {
          "ember": "~2.0.0"
        }
      }
    },
    {
      name: 'ember-2.1',
      bower: {
        dependencies: {
          "ember": "~2.1.0"
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          "ember": "components/ember#release"
        },
        resolutions: {
          "ember": "release"
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          "ember": "components/ember#beta"
        },
        resolutions: {
          "ember": "beta"
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          "ember": "components/ember#canary"
        },
        resolutions: {
          "ember": "canary"
        }
      }
    }
  ]
};
