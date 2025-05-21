const { extractDOMFeatures } = require('../dom/extractor');
const { serializeDOM } = require('../dom/serializer');
const { getTLSHHash } = require('./client');

async function main() {

  try {   

    console.log('Requesting TLSH hash from server...');
    // Get TLSH hash from your Python server
    const known_websites = {
        "Stackoverflow" : "https://stackoverflow.com/users/login", 
        "Github" : "https://github.com/login", 
        "Reddit" : "https://www.reddit.com/", 
        "Instagram" : "https://www.instagram.com/accounts/login/", 
        "X" : "https://x.com/i/flow/login",
        "Pinterest" : "https://www.pinterest.com/login/",
        "LinkedIn" : "https://www.linkedin.com/login/",
        "Facebook" : "https://www.facebook.com/login/",
        "Quora" : "https://www.quora.com/"
    };

    for (const [name, link] of Object.entries(known_websites)) {
      const dom = await extractDOMFeatures(link);
      const serializedDOM = serializeDOM(dom);
      const hash = await getTLSHHash(serializedDOM);
      console.log(`{"site": "${name}", "hash": "${hash}", "link": "${link}"}`);
    }
  } catch (error) {
    console.error('Error during processing:', error.message);
  }
}

main();
