import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import * as cheerio from 'cheerio';
import BeanLabel from '../components/BeanLabel';
import type BeanShape from '../types/BeanShape';
import console from 'node:console';
import RoastShape from 'types/RoastShape';

// TODO: given a roast url, fetch all the numbers
// https://roast.world/serg.mo/roasts/QFoiG4ZLDPexRKGBWQjGW

// TODO: see if I can store bean name in the roast object itself
// https://api.roast.world/api-docs

const [sku, roastId] = process.argv.slice(2); // node, path, ...args
if (!sku || !roastId) {
  throw new Error('Usage: npm run label sku roastId');
}

const beanPath = resolve(`public/data/beans/${sku.toLowerCase()}.json`);
const bean = JSON.parse(await readFile(beanPath, 'utf8')) as BeanShape;
// console.log(bean)

const roastUrl = `https://api.roast.world/api/v3/public/roasts/${roastId}`;
const response = await fetch(roastUrl, {
  headers: {
    'x-api-key': process.env.ROASTWORLD_TOKEN,
  },
});

if (!response.ok) throw new Error(`RoastWorld returned ${response.status}`);
const roast = await response.json();
console.log(roast);

const template = await readFile('public/index.html', 'utf8');

const html = template.replace(
  '<div id="root"></div>',
  `
  <script src="https://cdn.tailwindcss.com"></script>
  <div id="root">
    ${renderToString(<BeanLabel bean={bean} roast={roast} />)}
  </div>
  `,
);

await writeFile('public/bean-label.html', html);
