import { exit } from "process";
import { fetchProductUrl } from "./include.ts";

const url = process.argv[2];
if (!url) {
  console.error("Usage: npm run fetch-product <url>");
  exit(1);
}

await fetchProductUrl(url);
