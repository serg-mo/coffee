import axios from axios;


async function fetchPage(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const attributes = {};
        $(".spd-matrix-attributes .d-flex").each((_, el) => {
            const label = $(el).find("label").text().trim();
            const value = $(el).find("span").attr("class").match(/\d+/)[0];
            attributes[label] = parseInt(value, 10);
        });

        const flavors = {};
        $(".spd-matrix-flavors .d-flex").each((_, el) => {
            const label = $(el).find("label").text().trim();
            const value = $(el).find("span").attr("class").match(/\d+/)[0];
            flavors[label] = parseInt(value, 10);
        });

        const specifications = $("#ctl00_MainContentHolder_lblShortDescription").text().trim();

        return { attributes, flavors, specifications };
    } catch (error) {
        console.error("Error fetching the URL:", error);
    }
}

const url = process.argv[2]; // first argument
// console.log(url)

const data = await fetchPage(url);

await fs.writeFile(path, JSON.stringify(torrents, null, 2));
