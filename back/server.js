const { randomInt } = require('crypto');
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

const catsData = JSON.parse(fs.readFileSync('cats.json','utf8'));

app.get('/summon', (req, res) => {
    const luck = randomInt(100);
    var rarity = 'basic';
    
    if (luck >= 90) {
        rarity = 'legendary';
    } else if (luck >= 70) {
        rarity = 'mythic';
    } else if (luck >= 40) {
        rarity = 'rare';
    }
    pool = catsData.filter(cat => cat.rarity === rarity);
    const randomIndex = Math.floor(Math.random() * pool.length);

    res.json(pool[randomIndex]);
})

app.get('/getcat/:id', (req, res) => {
    const id = req.params.id;
    res.json(catsData.find(cat => cat.id === id));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})