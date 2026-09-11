import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";

async function fetchPage(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const product = $('script[type="application/ld+json"]')
    .toArray()
    .map((el) => JSON.parse($(el).text()))
    .find((json) => json["@type"] === "Product");
  // console.log(product);

  let attributes: Record<string, number> = {};
  let flavors: Record<string, number> = {};

  // attributes and flavors
  $(".pdp-fp-group").each((_, el) => {
    const group = $(el).find(".pdp-fp-group-label").text().trim().toLowerCase();
    const labels = $(el)
      .find(".pdp-fp-label")
      .toArray()
      .map((el) => $(el).text().trim().toLowerCase());
    const values = $(el)
      .find(".pdp-fp-val")
      .toArray()
      .map((el) => $(el).text().trim());

    if (group === "attributes") {
      attributes = Object.fromEntries(
        labels.map((label, index) => [label, parseInt(values[index])]),
      ); // out of 7
    } else if (group === "flavors") {
      flavors = Object.fromEntries(
        labels.map((label, index) => [label, parseInt(values[index])]),
      ); // out of 4
    }
  });

  const specifications: Record<string, string> = {};
  $(".pdp-spec-list .pdp-spec-row").each((_, el) => {
    const label = $(el).find(".pdp-spec-label").text().trim();
    const value = $(el).find(".pdp-spec-value").text().trim();
    specifications[label] = value;
  });

  return {
    sku: product.sku,
    name: product.name,
    url: product.url,
    image: product.image,
    attributes,
    flavors,
    specifications,
    description: product.description.replace(/’/g, "'"),
  };
}

// url to the bean page is the only argument
const url = process.argv[2];
if (!url) {
  console.error("Usage: npm run fetch-product <url>");
  process.exit(1);
}

const data = await fetchPage(url);
// console.log(data)

if (!data.sku) {
  console.error(`Failed to fetch page, ${url}`);
  process.exit(1);
} else {
  console.log(`Fetched ${data.sku}: ${data.name}`);
  const path = `public/data/beans/${data.sku.toLowerCase()}.json`;
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}
