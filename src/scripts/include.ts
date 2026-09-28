import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const BASE_URL = "https://www.coffeebeancorral.com";
const BEANS_PATH = "./public/data/beans.json";

export function getSkuPath(sku: string) {
    return `./public/data/beans/${sku.toLowerCase()}.json`;
}

export async function fetchProductUrl(url: string) {
    const data = await fetchProductUrlInner(url);
    // console.log(data)

    if (data.sku) {
        console.log(`${data.sku}: ${data.name}`);
        fs.writeFileSync(getSkuPath(data.sku), JSON.stringify(data, null, 2));
    } else {
        console.error(`fetchProductUrl ${url}`);
    }

    return data
}

async function fetchProductUrlInner(url: string) {
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

async function fetchSkuUrls(url: string) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const urls = {};

    $("script").each((_, el) => {
        const text = $(el).html() || "";
        const match = text.match(/var\s+meta\s*=\s*(\{"products".*?\});/s);
        if (!match) return;

        const meta = JSON.parse(match[1]);
        for (const product of meta.products || []) {
            for (const variant of product.variants || []) {
                if (variant.sku && product.handle) {
                    urls[variant.sku] = `${BASE_URL}/products/${product.handle}`;
                }
            }
        }
    });

    return urls; // sku => product url
}

export async function searchBySku(sku: string) {
    const beans = fs.existsSync(BEANS_PATH)
        ? JSON.parse(fs.readFileSync(BEANS_PATH, "utf8"))
        : {};

    if (beans[sku]) {
        return beans[sku]
    }

    const delta = await fetchSkuUrls(`${BASE_URL}/search?q=${sku}`);
    const newBeans = { ...beans, ...delta }

    fs.writeFileSync(BEANS_PATH, JSON.stringify(newBeans, null, 2));

    return newBeans[sku] ?? null;
}
