import { module, test } from 'qunit';
import { setupTest } from 'library-app/tests/helpers';

module('Unit | Service | local-storage-variable', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:local-storage-variable');
    assert.ok(service);
  });
});
