import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('script', 'Script', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
