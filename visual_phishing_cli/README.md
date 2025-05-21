# CLI Visual-Based Phishing Detection

## Instructions

### Step 1: Start the Python TLSH Hashing Service

```bash
cd python_tls_service
pip install flask py-tlsh
python app.py
```

### Step 2: Run the Node CLI Detection Tool

```bash
cd cli
npm install puppeteer
node puppeteer_runner.js
```

This script extracts DOM features from a live website, sends it to the TLSH hash server, and compares it with the hardcoded whitelist.

Node.js CLI Client (your runner.js and related JS modules)

Takes a URL input from the user.

Extracts DOM features from the webpage at the URL.

Serializes the DOM into a string.

Sends the serialized DOM string to the Python Flask backend to generate a TLSH hash.

Sends the generated TLSH hash to the Flask backend for similarity comparison with hashes in a whitelist.

Receives similarity scores and outputs whether the URL is likely phishing or legitimate.

Python Flask Backend

Provides two APIs:

/api/hash: Accepts serialized DOM string and returns a TLSH hash.

/api/diff: Accepts two TLSH hashes and returns a similarity score (diff).

Uses the tlsh Python library to generate hashes and calculate difference scores.

Whitelist Database (JSON file)

Contains precomputed TLSH hashes for known legitimate login pages (Facebook, Google, etc.).

Used to compare against the target page hash to detect phishing.