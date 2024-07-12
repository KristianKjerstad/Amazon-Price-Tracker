const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true }); 
const args = process.argv.slice(2)
const url = args[0] // "https://www.amazon.com/Samsung-Internal-Computer-MZ-V9E1T0B-AM/dp/B0CRCC9863" 
const minPrice = args[1] // 150

async function checkPrice() {
    console.log(`start: ${url} - ${minPrice}`);
    try {
        const customHeaders = {
            "Accept-Language": "en-GB,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Cache-Control": "max-age=0",
            "Connection": "keep-alive",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15"
        };
        const priceString = await nightmare
        .useragent(customHeaders["User-Agent"])
        .goto("https://www.amazon.com/Samsung-Internal-Computer-MZ-V9E1T0B-AM/dp/B0CRCC9863")
            .wait(".a-price-whole")
            .evaluate(() => document.getElementsByClassName("a-price-whole")[0].innerText)
            .end();

        console.log("got price");
        const priceNumber = parseFloat(priceString.replace(/,/g, '')); // Remove commas for proper parsing
        const priceLimit = parseFloat(minPrice)
        if (priceNumber < priceLimit) {
            console.log("it is cheap");
        } else {
            console.log("it is expensive");
        }
    } catch (error) {
        console.error("Failed to get the price:", error);
    }
}

checkPrice();
