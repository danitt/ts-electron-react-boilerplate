import { getStoreValue, setStoreValue } from './store';

describe('Store utility wrapper', () => {
  it('reads and writes to store', () => {
    const testKey = 'testKey';
    const testValue = 'testValue';
    expect(getStoreValue(testKey)).toBeUndefined();
    setStoreValue(testKey, testValue);
    expect(getStoreValue(testKey)).toEqual(testValue);
  });
});
