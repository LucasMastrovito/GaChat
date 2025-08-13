const { randomInt } = require('crypto');
const express = require('express')
const app = express()
var cors = require('cors');
app.use(cors());
const port = 3000
const fs = require('fs')

const catsData = JSON.parse(fs.readFileSync('cats.json','utf8'));
const users = JSON.parse(fs.readFileSync('users.json','utf8'));

app.get('/summon/:user', (req, res) => {
    const userId = parseInt(req.params.user);
    const user = users.find(u => u.id === userId);
    const today = new Date().toDateString();
    const luck = randomInt(100);
    var rarity = 'basique';

    if (user.lastreset !== today) {
        user.attemps = 5;
        user.lastreset = today;
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    }

    if (user.attemps === 0) {
        res.json({'attemps': 0});
    } else {
        user.attemps--;
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
        if (luck >= 95) {
        rarity = 'divin';
        }
        else if (luck >= 90) {
            rarity = 'legendary';
        } else if (luck >= 70) {
            rarity = 'mythic';
        } else if (luck >= 40) {
            rarity = 'rare';
        }
        pool = catsData.filter(cat => cat.rarity === rarity);
        const randomIndex = Math.floor(Math.random() * pool.length);
        const randomCat = pool[randomIndex];

        if (user.invocations[randomCat.id]) {
            user.invocations[randomCat.id]++;
        } else {
            user.invocations[randomCat.id] = 1;
        }
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

        res.json(randomCat);
    }
})

app.get('/getcat/:id', (req, res) => {
    const id = req.params.id;
    res.json(catsData.find(cat => cat.id === id));
})

app.get('/collection/:user', (req, res) => {
    const userId = parseInt(req.params.user);
    const user = users.find(u => u.id === userId);

    res.json(user.invocations);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})