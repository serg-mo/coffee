import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";

async function fetchPage(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

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

    return { attributes, flavors, specifications, description };
  } catch (error) {
    console.error("Error fetching the URL:", error);
  }
}

const url = process.argv[2]; // first argument
const name = process.argv[3];
const path = `public/data/beans/${name}.json`;
// console.log({ url, name, path })

const data = await fetchPage(url);
// console.log(data);

await fs.writeFile(path, JSON.stringify(data, null, 2));
