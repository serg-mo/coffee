import fs from "fs";
import { globSync } from "glob";
import { searchBySku, fetchProductUrl, getSkuPath } from "./include.ts"
import { exit } from "process";
import { resolve } from "dns";

// NOTE: ${year}/${region}.json
const files = globSync("./public/data/*/*.json");

const names = new Set(files.flatMap((file) => {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return data && data.names ? Object.values(data.names) : [];
}))

const skus = [...names].filter(Boolean).map(String).sort(); // no epties, no dupes
const missing = skus.filter((sku: any) => !fs.existsSync(getSkuPath(sku)));

if (!missing.length) {
  console.error("No missing beans");
  exit(1);
}

console.log(`${skus.length} total, ${missing.length} missing\n`);
for (const sku of missing) {
  const url = await searchBySku(sku)
  if (url) {
    await fetchProductUrl(url);
  } else {
    console.error(`No search results for ${sku}`);
  }

  await new Promise((resolve) => setTimeout(resolve, 2_000)); // milliseconds
}