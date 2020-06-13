import { IS_TEST } from '@src/environment';
import Store from 'electron-store';

const storeName: string = IS_TEST ? 'testConfig' : 'config';
const store = new Store({ name: storeName });

export function getStoreValue<ExpectedResultType>(key: string): ExpectedResultType | undefined {
  return store.get(key);
}

export function setStoreValue(key: string, value: unknown): void {
  return store.set(key, value);
}
