# WebDAV Crawler

Crawls WebDAV folders.

Edit `config.json` or configure with environment variables to set up.

## Usage

You can either use `npm start` to run the application as a web microservice. Sending a POST request to `/crawl` will cause the application to crawl the folders.

Alternatively, run `npm run exec` to simply crawl the folders once and exit.
