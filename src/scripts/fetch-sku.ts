import { exit } from "process";
import { searchBySku, fetchProductUrl } from "./include.ts"

// TODO: fetch every bean that shows up when you search for an sku, don't fetch the same one twice
const sku = (process.argv[2] || "").toUpperCase(); // all caps, always
if (!sku) {
  console.error("Usage: npm run fetch-sku <sku>");
  exit(1);
}

const url = await searchBySku(sku)
if (url) {
  await fetchProductUrl(url);
}