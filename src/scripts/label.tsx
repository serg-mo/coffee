import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as cheerio from "cheerio";
import BeanLabel from "../components/BeanLabel";
import type BeanShape from "../types/BeanShape";
import console from "node:console";
import RoastShape from "types/RoastShape";

// TODO: given a roast url, fetch all the numbers
// https://roast.world/sergmo/roasts/QFoiG4ZLDPexRKGBWQjGW/qr?redirect=%2Fsergmo%2Froasts%2FQFoiG4ZLDPexRKGBWQjGW

const [sku, roastUrl] = process.argv.slice(2); // node, path, ...args
if (!sku || !roastUrl) {
  throw new Error("Usage: npm run label <sku> <roastUrl>");
}

const beanPath = resolve(`public/data/beans/${sku.toLowerCase()}.json`);
const bean = JSON.parse(await readFile(beanPath, "utf8")) as BeanShape;
// console.log(bean)

const response = await fetch(roastUrl);
if (!response.ok) throw new Error(`RoastWorld returned ${response.status}`);
const html = await response.text();
// console.log(html)

const $ = cheerio.load(html);

const marker = "window.__remixContext = ";
const script = $("script")
  .toArray()
  .map((el) => $(el).html() ?? "")
  .find((text) => text.includes(marker));

const txt = script
  ?.slice(script.indexOf(marker) + marker.length)
  .trim()
  .replace(/;$/, ""); // remove trailing semicolon
const json = JSON.parse(txt ?? "{}");
const data = json.state.loaderData["routes/_qr.public-profiles.$id"];

const roast = {
  weightGreen: data.roast.weightGreen,
  weightRoasted: data.roast.weightRoasted,

  yellow: {
    temp: data.roast.beanTemperature[data.roast.indexYellowingStart],
    time: "3:15", // derive from the time-series index if possible
  },

  firstCrack: {
    temp: data.firstCrack.temperature,
    time: data.firstCrack.time,
  },

  drop: {
    temp: data.roast.beanDropTemperature,
    time: "9:06", // derive from totalRoastTime if needed
  },

  dateTime: new Date(data.roast.dateTime),
} as RoastShape;
console.log(roast);

// const roast = {
//     weightGreen: 500,
//     weightRoasted: 436,
//     yellow: { temp: 161.8, time: "3:15" },
//     firstCrack: { temp: 201.8, time: "7:23" },
//     drop: { temp: 209.6, time: "9:06" },
//     date: new Date().toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//     }),
// };

// TODO: use bean + roast to generate 4x6 label (html + tailwind)
