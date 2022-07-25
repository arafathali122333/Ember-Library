import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | login-or-register', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<LoginOrRegister />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <LoginOrRegister>
        template block text
      </LoginOrRegister>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
