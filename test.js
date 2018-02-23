import test from 'ava';
import winReleaseId from '.';

test('win10', t => {
  t.deepEqual(winReleaseId('10.0.16299.214'), 1709);
});
