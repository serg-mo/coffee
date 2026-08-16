import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://www.coffeebeancorral.com";
const PRODUCT_URL_REGEX = /^\/.*\/(?:[^/]*__)[^/]+\.aspx$/i;

async function fetchProductList(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const seen = new Set<string>();

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href || !PRODUCT_URL_REGEX.test(href)) return;

    seen.add(BASE_URL + href.replace(/\/$/, ""));
  });

  return Array.from(seen);
}

// const urls = await fetchProductList(`${BASE_URL}/back-in-stock.aspx`);
// const urls = await fetchProductList(`${BASE_URL}/coming-soon.aspx`);
const urls = await fetchProductList(`${BASE_URL}/categories/new-coffees.aspx`);
console.log(urls);
