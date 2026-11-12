import assert from 'assert';
import BeanShape from '../types/BeanShape';

const beanCache = new Map<string, BeanShape>();

export function getBeanData(name: string) {
  // NOTE: must be relative, because production is on domain/folder/
  // NOTE: should work for github pages and locally for /label
  const url = `${__webpack_public_path__}data/beans/${name.toLowerCase()}.json`;

  if (beanCache.has(url)) {
    return Promise.resolve(beanCache.get(url));
  }

  return fetch(url)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data) beanCache.set(url, data);
      return data;
    })
    .catch(() => null); // NOTE: silent fail for missing bean data
}

export function formatSeconds(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')} `;
}

console.assert(formatSeconds(0) === '0:00 ');
console.assert(formatSeconds(60) === '1:00 ');
console.assert(formatSeconds(90) === '1:30 ');

export function formatPercent(fraction: number) {
  return `${(100 * fraction).toFixed()}%`;
}

console.assert(formatPercent(0) === '0%');
console.assert(formatPercent(0.5) === '50%');
console.assert(formatPercent(1) === '100%');
