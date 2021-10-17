import test from 'ava';
import winReleaseId from '.';

test('Windows 7', t => {
  t.deepEqual(winReleaseId('6.1.7601'), -1);
});

test('Windows 10 Version 1709', t => {
  t.deepEqual(winReleaseId('10.0.16299.214'), 1709);
});

test('Windows 10 Version 1809', t => {
  t.deepEqual(winReleaseId('10.0.17763.1'), 1809);
});

test('Windows 11 21H2', t => {
  t.deepEqual(winReleaseId('10.0.22000.258'), 2009);
});
