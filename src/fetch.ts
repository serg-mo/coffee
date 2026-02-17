import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";

async function fetchPage(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const sku = $('[itemprop="sku"]').first().text().trim().toLowerCase();

  const attributes = {};
  $(".spd-matrix-attributes .d-flex").each((_, el) => {
    const label = $(el).find("label").text().trim();
    const value = $(el).find("span").attr("class").match(/\d+/)[0];
    attributes[label] = parseInt(value, 10); // out of 7
  });

  const flavors = {};
  $(".spd-matrix-flavors .d-flex").each((_, el) => {
    const label = $(el).find("label").text().trim();
    const value = $(el).find("span").attr("class").match(/\d+/)[0];
    flavors[label] = parseInt(value, 10); // out of 4
  });

  const specifications = {};
  $(".producttypepanel li").each((_, el) => {
    const label = $(el).find(".productpropertylabel").text().trim();
    const value = $(el).find(".productpropertyvalue").text().trim();
    specifications[label] = value;
  });

  const description = $('[itemprop="description"]').first().text().trim();

  return { sku, attributes, flavors, specifications, description };
}

// url to the bean page is the only argument
const url = process.argv[2];
const data = await fetchPage(url);
// console.log({ url, data })

if (!data.sku) {
  throw new Error("URL must have the key in the path!");
}

const path = `public/data/beans/${data.sku}.json`;
await fs.writeFile(path, JSON.stringify(data, null, 2));
