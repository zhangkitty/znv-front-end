/**
 * Created by fed on 2017/12/6.
 */
import test from 'ava';
import * as is from '../is';

test('isaPositiveNumber', (t) => {
  [1.22, 3, 4.3333, 213213213].forEach(num => t.truthy(is.isaPositiveNumber(num)));
  [-1.22, -3, -0.3333, 0].forEach(num => t.falsy(is.isaPositiveNumber(num)));
});
