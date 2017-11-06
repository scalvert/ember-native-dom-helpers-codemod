import { click, find, findAll, fillIn, blur, triggerEvent } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foo-bar', 'Integration | Component | foo bar', {
  integration: true
});

async function fillInHelper(value) {
  await fillIn('.foo input', value);
  await triggerEvent(`.foo input`, 'change');
}

test('it renders', async function(assert) {
  this.render(hbs`{{foo-bar}}`);

  await click('.foo');
  assert.equal(find('.foo').id, 'foo');
  await fillIn('.foo input', 'bar');
  await blur('.foo input');
  assert.equal(find('.foo').textContent.trim(), 'foo');
});

test('it renders again', function(assert) {
  this.render(hbs`{{foo-bar}}`);

  let selector = '.foo input';
  assert.equal(findAll(this.$(selector)[0]).length, 1);
  assert.equal(find(this.$(selector)[0]).value, 'foo');
  assert.ok(find('.foo').classList.contains('selected'));
});

test('and again', async function(assert) {
  this.render(hbs`{{foo-bar}}`);

  await click('foo');

  fillInHelper.call(this, 'bar');
  assert.ok(find('.foo').classList.contains('selected'));
});