const { extractDOMFeatures } = require('./dom/extractor');
const { serializeDOM } = require('./dom/serializer');
const { getTLSHHash } = require('./hash/client');
const { compareHashes } = require('./hash/comparator');
const config = require('./config');

const targetUrl = process.argv[2];
let phish = false;

async function main() {
  if (!targetUrl) {
    console.error('Usage: node runner.js <url>');
    process.exit(1);
  }

  console.log(`Extracting DOM features from: ${targetUrl}`);

  try {
    // Extract and serialize DOM content
    const dom = await extractDOMFeatures(targetUrl);
    const serializedDom = serializeDOM(dom);

    console.log('Requesting TLSH hash from server...');
    // Get TLSH hash from your Python server
    const hash = await getTLSHHash(serializedDom);
    console.log(`TLSH Hash: ${hash}`);

    console.log('Comparing with whitelist...');
    // Await the async compareHashes function
    const results = await compareHashes(hash);

    console.log('Similarity Scores:');
    results.forEach(({ site, score }) => {
      const isMatch = score <= config.similarityThreshold;
      console.log(`- ${site}: score=${score} => ${isMatch ? 'MATCH' : 'NO MATCH'}`);
      if (isMatch) {
        const site_details = require('./whitelist/whitelist.json').find(entry => entry.site === site);
        const whitelist_link = site_details.link;
        const target_domain = new URL(targetUrl).hostname;
        const whitelist_domain = new URL(whitelist_link).hostname;
        if (target_domain !== whitelist_domain) {
          phish = true;
        }
      }
    });

  } catch (error) {
    console.error('Error during processing:', error.message);
  }
  if(phish){
    console.log("Phishing detected!");
  } 
  else{
    console.log("No phishing detected!");
  } 
}

main();
