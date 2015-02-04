import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:entries', 'EntriesController', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['controller:index']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});
