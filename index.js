const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const catsapi = [];


app.get('/', async (req,res) => {res.json({message: 'Hello, World!'})})

app.get('/catsapi', async (req, res) => {

    axios.get('https://thecatapi.com')
    .then(response => {
       // console.log(response.data); //log the html content
        const html = response.data;
        const $ = cheerio.load(html);
        
        $('a').each(function() {
            const title = $(this).text(); 
            const url = $(this).attr('href');

            catsapi.push({
                title,
                url
            })
        });

        res.json(catsapi);
  })
.catch(error => {
    console.error('Error fetching catsapi:', error);
    res.status(500).json({ error: 'Failed to fetch catsapi' });
});

})

app.listen(PORT, () => console.log('Server is running on port ${PORT}'));

