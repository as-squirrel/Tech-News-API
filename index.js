const PORT = 8080;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const newspapers = [
    {
        name: 'usatoday',
        address: 'https://eu.usatoday.com/tech/'
    },
    {
        name: 'nytimes',
        address: 'https://www.nytimes.com/section/technology'
    },
    {
        name: 'reuters',
        address: 'https://www.reuters.com/news/technology'
    },
    {
        name: 'cnn',
        address: 'https://edition.cnn.com/business/tech'
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/technology'
    },
    {
        name: 'arstechnica',
        address: 'https://arstechnica.com/'
    },
    {
        name: 'techcrunch',
        address: 'https://techcrunch.com/'
    },
    {
        name: 'mashable',
        address: 'https://mashable.com/tech/'
    }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.json('This is a Tech News API');
});

app.get('/sources', (req, res) => {
    const sources = newspapers.map((newspaper) => newspaper.name);
    res.json(sources);
});

app.get('/search', async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const articles = [];

        await Promise.all(
            newspapers.map(async (newspaper) => {
                const response = await axios.get(newspaper.address);
                const html = response.data;
                const $ = cheerio.load(html);

                let selector = '';
                let titleSelector = '';
                let textSelector = '';

                switch (newspaper.name) {
                    case 'nytimes':
                        selector = '.css-uuu4k4';
                        titleSelector = 'h3.css-miszbp.e1hr934v2 a';
                        textSelector = 'p.css-tskdi9.e1hr934v5';
                        break;
                    case 'reuters':
                        selector = 'li.story-collection__story__LeZ29';
                        titleSelector = 'h3.text__medium__1kbOh a';
                        textSelector = 'p.text__regular__2N1Xr';
                        break;
                    default:
                        break;
                }

                $(selector).each(function () {
                    const title = $(this).find(titleSelector).text();
                    const url = $(this).find(titleSelector).attr('href');
                    const imageUrl = $(this).find('img').attr('src');
                    const articleText = $(this).find(textSelector).text();

                    if (articleText.toLowerCase().includes(keyword.toLowerCase()) || title.toLowerCase().includes(keyword.toLowerCase())) {
                        articles.push({
                            title,
                            url,
                            imageUrl,
                            source: newspaper.name
                        });
                    }
                });
            })
        );

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});









app.get('/news', async (req, res) => {
    try {
        const articles = [];

        await Promise.all(
            newspapers.map(async (newspaper) => {
                const response = await axios.get(newspaper.address);
                const html = response.data;
                const $ = cheerio.load(html);

                if (newspaper.name === 'nytimes') {
                    $('.css-uuu4k4').each(function() {
                        const title = $(this).find('h3.css-miszbp.e1hr934v2 a').text();
                        const url = 'https://www.nytimes.com' + $(this).find('h3.css-miszbp.e1hr934v2 a').attr('href');
                        const imageUrl = $(this).find('img').attr('src');

                        articles.push({
                            title,
                            url,
                            imageUrl,
                            source: newspaper.name
                        });
                    });
                } else if (newspaper.name === 'reuters') {
                    $('li.story-collection__story__LeZ29').each(function() {
                        const title = $(this).find('h3.text__medium__1kbOh a').text();
                        const url = 'https://www.reuters.com' + $(this).find('h3.text__medium__1kbOh a').attr('href');
                        const imageUrl = $(this).find('img').attr('src');
                        const date = $(this).find('time.text__regular__2N1Xr').text();

                        articles.push({
                            title,
                            url,
                            imageUrl,
                            date,
                            source: newspaper.name
                        });
                    });
                } else if (newspaper.name === 'cnn') {
                    $('div.card.container__item.container__item--type-section').each(function() {
                        const title = $(this).find('span[data-editable="headline"]').text();
                        const url = 'https://edition.cnn.com' + $(this).find('a.container__link.container_lead-plus-headlines-with-images__link').attr('href');
                        const imageUrl = $(this).find('img').attr('data-url');

                        articles.push({
                            title,
                            url,
                            imageUrl,
                            source: newspaper.name
                        });
                    });
                } else {
                    $('a.section-helper-flex.section-helper-row.ten-column.spacer-small.p1-container').each(function() {
                        const title = $(this).find('.p1-title-spacer').text();
                        const url = $(this).attr('href');

                        articles.push({
                            title,
                            url,
                            source: newspaper.name
                        });
                    });
                }
            })
        );

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
