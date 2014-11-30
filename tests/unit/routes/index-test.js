import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:index', 'IndexRoute', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it should set its model to something', function() {
  var route = this.subject();
  ok(route.model);
});
