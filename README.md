# Tech News API

The Tech News API is a web service built using Node.js and Express.js. It allows users to access news articles related to technology from trusted sources. With this API users can retrieve headlines, sources and search, for articles based on keywords.

## Features

 **Retrieve News Headlines;** Access the technology news headlines from different sources.
 **List News Sources;** Get a list of sources for news.
 **Search for News;** Look for technology news articles that contain keywords.
 **Filter by Date;** Find news articles published on a date.

## Installation

1. Clone the repository;

  ```bash
  git clone https://github.com/as-squirrel/Tech-News-API.git
  cd Tech-News-API
  ```

2. Install dependencies;

  ```
  npm install
  ```

3. Start the server;

  ```
npm start
  ```

  The API will be accessible, at `http://localhost:8080`.

## Usage

1. **Get News Headlines;** Utilize the `/news` endpoint to fetch the technology news headlines.

2. **Browse News Sources;** Access the `/sources` endpoint to explore the variety of news sources that're available.

3. **Find Relevant News;** Utilize the `/search` endpoint adding a `keyword` query parameter to discover news articles that specifically mention keywords.

4. **Narrow Down, by Date;** Employ the `/news/date/;date` endpoint to locate news articles published on a date (`/news/date/2023 09 15`).

5. ## Technologies Used

- Node.js
- Express.js
- Axios
- Cheerio (for web scraping)

## Sources

This project uses web scraping to gather news articles from various sources, including:

- USA Today
- The New York Times
- Reuters
- CNN


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
